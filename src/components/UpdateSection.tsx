/* eslint-disable no-console */
'use client'

import React, { useMemo, useState } from 'react'
import algoliasearch from 'algoliasearch'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'

import { getAllRecords, getPapers } from '../api/general'
import { getEmbedding, updateVector } from '../utilities/paperDetail'

import type { PaperData } from '@/types'

type TriggerResponse =
  | {
      job: {
        id: string
        state: 'PENDING' | 'SUCCESS' | 'FAILURE'
        createdAt: number
      }
    }
  | undefined

const status = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failure: 'failure',
}

const UpdateSection = (): JSX.Element => {
  const [rebuild, setRebuild] = useState(status.idle)
  const [updateIndices, setUpdateIndices] = useState(status.idle)

  const client = useMemo(
    () =>
      algoliasearch(
        process.env.PAYLOAD_PUBLIC_ALGOLIA_APP_ID,
        process.env.PAYLOAD_PUBLIC_ALGOLIA_ADMIN_KEY,
      ),
    [],
  )

  const triggerRebuild = async (): Promise<void> => {
    try {
      const rebuildRes = await fetch(process.env.PAYLOAD_PUBLIC_TRIGGER_URL)
      const jobResponse: TriggerResponse = await rebuildRes.json()

      if (jobResponse?.job.state === 'PENDING') {
        console.log('trigger rebuild success')
        setRebuild(status.success)
      }
    } catch (error: unknown) {
      console.error(`trigger rebuild failed: ${error}`)
      setRebuild(status.failure)
    }
  }

  const updateAlgoliaIndex = async (newData): Promise<void> => {
    try {
      const index = client.initIndex('psychedelics_db')
      const algoliaResponse = await index.saveObjects(newData)
      console.log('update algolia index success', algoliaResponse)
      setUpdateIndices(status.success)
    } catch (error: unknown) {
      console.error(`update algolia index failed: ${error}`)
      setUpdateIndices(status.failure)
    }
  }

  const onUpdateIndicesBtnClick = async (): Promise<void> => {
    const transformedRecords = await getAllRecords().then((records) => {
      return records.map(({ id: objectID, ...record }) => ({
        ...record,
        objectID,
      }))
    })

    const transformedPapers = await getPapers().then((papers) => {
      return papers.map(({ id: objectID, ...paper }) => ({
        ...paper,
        objectID,
      }))
    })

    const wholeData = [...transformedRecords, ...transformedPapers]

    if (wholeData.length === 0) {
      console.log('no data')
      return
    } else {
      setUpdateIndices(status.pending)
      setTimeout(() => {
        updateAlgoliaIndex(wholeData)
      }, 3000)
    }
  }

  const onButtonClick = async (): Promise<void> => {
    await getAllRecords().then((records) => {
      const transformedRecords = records.map(({ id: objectID, ...record }) => ({
        ...record,
        objectID,
      }))

      setRebuild(status.pending)
      setUpdateIndices(status.pending)

      setTimeout(() => {
        updateAlgoliaIndex(transformedRecords)
        triggerRebuild()
      }, 3000)
    })
  }

  const flattenData = (data) => {
    let flattenData = ''
    for (const key in data) {
      if (key === 'summary') {
        data[key].forEach(({ summary }, i) => {
          flattenData += `summary${i + 1}: ${summary}; `
        })
      } else if (key === 'abstract') {
        const abstract = data[key][0]?.children[0]?.text || ''
        flattenData += `abstract: ${abstract}; `
      } else if (Array.isArray(data[key])) {
        flattenData += `${key}: ${data[key].join(', ')}; `
      } else {
        flattenData += `${key}: ${data[key]}; `
      }
    }
    return flattenData
  }

  const generateFlattenPaperData = async () => {
    const transformedPapers = await getPapers().then((papers) => {
      return papers.map(({ id: objectID, ...paper }) => ({
        payload: {
          ...paper,
          objectID,
        } as PaperData & { objectID: string },
        flattenString: flattenData(paper),
      }))
    })

    const operationInfo = (await Promise.allSettled(
      transformedPapers.map(async (paper) => {
        const { embedding } = await getEmbedding(paper.flattenString)

        return {
          id: uuidv4(),
          vector: embedding,
          payload: paper.payload,
        }
      }),
    )) as {
      status: 'fulfilled' | 'rejected'
      value?: {
        id: string
        vector: number[]
        payload: PaperData & { objectID: string }
      }
    }[]

    const successfulResults = operationInfo.filter(
      (result) => result.status === 'fulfilled',
    )

    const successfulPapers = successfulResults.map((result) => result?.value)

    try {
      // Update the vector database with the successful results
      const vectorRes = await updateVector(successfulPapers)
      console.log(vectorRes)
    } catch (error: unknown) {
      console.error(`update vector failed: ${error}`)
    }
  }

  return (
    <section>
      <div>
        The button below will trigger a rebuild of the site, and update search
        indices on Algolia.
      </div>
      <div className='button-wrapper'>
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small'
          type='button'
          onClick={onButtonClick}
        >
          Rebuild and Update
        </button>
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small'
          type='button'
          onClick={onUpdateIndicesBtnClick}
        >
          Update indices
        </button>
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small'
          type='button'
          onClick={generateFlattenPaperData}
        >
          Flatten
        </button>
      </div>
      <div>
        <div className='status-wrapper'>
          <span>Rebuild status: {rebuild}</span>
          <div className={clsx('status-light', rebuild)} />
        </div>
        <div className='status-wrapper'>
          <span>Update indices status: {updateIndices}</span>
          <div className={clsx('status-light', updateIndices)} />
        </div>
        <div className='result'>
          <span>Result</span>
          <div>
            {rebuild === status.pending && <div>Rebuild in progress...</div>}
            {rebuild === status.success && <div>Rebuild starting 🎉</div>}
            {rebuild === status.failure && <div>Rebuild failed 🫠</div>}
          </div>
          <div>
            {updateIndices === status.pending && (
              <div>Updating Algolia index in progress...</div>
            )}
            {updateIndices === status.success && (
              <div>Updating Algolia index success 🎉</div>
            )}
            {updateIndices === status.failure && (
              <div>Updating Algolia index failed 🫠</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateSection
