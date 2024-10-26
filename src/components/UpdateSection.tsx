/* eslint-disable no-console */
'use client'

import React, { useMemo, useState } from 'react'
import algoliasearch from 'algoliasearch'
import clsx from 'clsx'

import { getAllRecords, getPapers } from '../api/general'

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
