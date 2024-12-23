'use client'

import React, { useEffect, useMemo, useState } from 'react'
import algoliasearch from 'algoliasearch'
import clsx from 'clsx'
import { v5 as uuidv5 } from 'uuid'

import {
  getAllRecords,
  getPapers,
  updatePaperVectorizeState,
} from '../api/general'
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

const statusMap = {
  ready: 'ready',
  pending: 'pending',
  success: 'success',
  failure: 'failure',
  running: 'running',
}

const resultMessageMap = {
  triggerRebuildSuccess: 'Trigger rebuild successful 🎯',
  triggerRebuildFailure: 'Trigger rebuild failed 😢',
  updateAlgoliaSuccess: 'Update Algolia index successful 🌀',
  updateAlgoliaFailure: 'Update Algolia index failed 😢',
  vectorUpdateSuccess: 'Vector update successful 🧠',
  vectorUpdateFailure: 'Vector update failed 😢',
  allPapersVectorized: 'All papers are vectorized 🎉, update skipped',
}

const UpdateSection = (): JSX.Element => {
  const [status, setStatus] = useState(statusMap.ready)
  const [resultMessage, setResultMessage] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const statusStyle = {
    success: 'bg-green-400',
    failure: 'bg-red-400',
    pending: 'bg-blue-400',
    ready: 'bg-blue-400',
    running: 'bg-orange-400',
  }

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
        setStatus(statusMap.success)
        setResultMessage(resultMessageMap.triggerRebuildSuccess)
      }
    } catch (error: unknown) {
      setResultMessage(`${resultMessageMap.triggerRebuildFailure}: ${error}`)
      setStatus(statusMap.failure)
    }
  }

  const updateAlgoliaIndex = async (newData): Promise<void> => {
    try {
      const index = client.initIndex('psychedelics_db')
      const response = await index.saveObjects(newData)

      if (response?.taskIDs) {
        setResultMessage(
          `${resultMessageMap.updateAlgoliaSuccess}: taskID - ${response?.taskIDs}`,
        )
        setIsUpdating(false)
        setStatus(statusMap.success)
      } else {
        setResultMessage(`${resultMessageMap.updateAlgoliaFailure}`)
        setIsUpdating(false)
        setStatus(statusMap.failure)
      }
    } catch (error: unknown) {
      setResultMessage(`${resultMessageMap.updateAlgoliaFailure}: ${error}`)
      setStatus(statusMap.failure)
    }
  }

  const onUpdateIndicesBtnClick = async (): Promise<void> => {
    setIsUpdating(true)
    setStatus(statusMap.running)

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
      setTimeout(() => {
        updateAlgoliaIndex(wholeData)
      }, 3000)
    }
  }

  const onButtonClick = async (): Promise<void> => {
    setIsUpdating(true)

    try {
      await getAllRecords().then((records) => {
        const transformedRecords = records.map(
          ({ id: objectID, ...record }) => ({
            ...record,
            objectID,
          }),
        )

        setStatus(statusMap.pending)

        setTimeout(() => {
          updateAlgoliaIndex(transformedRecords)
          triggerRebuild()
        }, 3000)
      })
    } catch (error: unknown) {
      console.error(`rebuild failed: ${error}`)
      setStatus(statusMap.failure)
    } finally {
      setIsUpdating(false)
    }
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

  const MY_NAMESPACE = process.env.PAYLOAD_PUBLIC_NAME_SPACE

  const generateDeterministicUUID = (id: String) => {
    return uuidv5(String(id), MY_NAMESPACE)
  }

  const generateFlattenPaperData = async () => {
    setIsUpdating(true)
    setStatus(statusMap.running)

    const transformedPapers = await getPapers().then((papers) => {
      const unVectorizedPapers = papers.filter((paper) => !paper.isVectorized)

      return unVectorizedPapers.map(({ id: objectID, ...paper }) => ({
        payload: {
          ...paper,
          objectID,
        } as PaperData & { objectID: string },
        flattenString: flattenData(paper),
      }))
    })

    if (transformedPapers.length === 0) {
      setStatus(statusMap.success)
      setResultMessage(resultMessageMap.allPapersVectorized)
      setIsUpdating(false)
      return
    }

    const operationInfo = (await Promise.allSettled(
      transformedPapers.map(async (paper) => {
        const { embedding } = await getEmbedding(paper.flattenString)

        return {
          id: generateDeterministicUUID(paper.payload.objectID),
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
    const newlyAddedPapersCount = successfulPapers?.length || 0
    const vectorRes = await updateVector(successfulPapers)

    // perform updatePaperVectorizeState for each successful paper
    const updateVectorRes = await Promise.allSettled(
      successfulPapers.map(async (paper) => {
        const { payload } = paper
        const { objectID } = payload
        return updatePaperVectorizeState(objectID, true)
      }),
    )

    if (updateVectorRes.some((res) => res.status === 'rejected')) {
      const failedPapers = updateVectorRes.filter(
        (res) => res.status === 'rejected',
      )
      const failedPaperIds = failedPapers.join(', ')
      setStatus(statusMap.failure)
      setResultMessage(
        `${resultMessageMap.vectorUpdateFailure}: ${failedPaperIds}`,
      )
    } else {
      if (vectorRes.success) {
        setStatus(statusMap.success)
        setResultMessage(
          `${resultMessageMap.vectorUpdateSuccess}, ${newlyAddedPapersCount} papers added to vector database`,
        )
      } else {
        setStatus(statusMap.failure)
        const message = `${resultMessageMap.vectorUpdateFailure} ${vectorRes?.message}`
        setResultMessage(message)
      }
    }

    setIsUpdating(false)
  }

  useEffect(() => {
    if (status === statusMap.success) {
      setTimeout(() => {
        setStatus(statusMap.ready)
      }, 10000)
    }
  }, [status])

  return (
    <div className='mt-4'>
      <h2 className='mb-10'>
        Utilities for rebuild, Algolia and vector indices update
      </h2>
      <section className='grid gap-4 md:grid-cols-2'>
        <div className='mb-4 flex flex-col gap-y-2 border-0 border-b-0 border-l-0 border-t-0 border-solid border-gray-400 md:border-r'>
          <div className='flex gap-2'>
            {/* <button
              className='btn btn--style-primary my-0 px-4 py-3 font-semibold whitespace-nowrap transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
              type='button'
              onClick={onButtonClick}
              disabled={isUpdating}
            >
              Rebuild and Update
            </button> */}
            <div className='max-w-xs'>
              Rebuild site and update Algolia indices
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              className='btn btn--style-primary my-0 whitespace-nowrap px-4 py-3 font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
              type='button'
              onClick={onUpdateIndicesBtnClick}
              disabled={isUpdating}
            >
              Update indices
            </button>
            <div className='max-w-xs'>
              Update the search indices on Algolia with both the records and
              papers
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              className='btn btn--style-primary my-0 whitespace-nowrap px-4 py-3 font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
              type='button'
              onClick={generateFlattenPaperData}
              disabled={isUpdating}
            >
              Update Vector
            </button>
            <div className=''>
              Flatten & Vector Update: This will generate the flatten string of
              the paper data and update the vector database
            </div>
          </div>
        </div>
        <div className='pl-2'>
          <div className='mb-4 flex items-center text-xl font-semibold'>
            <span className='mr-2'>Status</span>
            {isUpdating && (
              <svg
                aria-hidden='true'
                className='h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            )}
          </div>
          <div className='flex items-center'>
            <span className='mr-3'>Current Status</span>
            <span className='relative flex h-5 w-5'>
              <span
                className={clsx(
                  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  statusStyle[status],
                )}
              />
              <span
                className={clsx(
                  'relative inline-flex h-5 w-5 rounded-full',
                  statusStyle[status],
                )}
              />
            </span>
          </div>
          <div className=''>
            <span>Result: </span>
            <span className='font-semibold'>{resultMessage}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UpdateSection
