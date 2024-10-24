import React, { useCallback, useState } from 'react'
import { useField, useForm } from 'payload/components/forms'

import { summarizePaperWithDoi } from '../../utilities/paperDetail'

type Props = {
  path: string
  required?: boolean
  label?: string
  validate?: (value: unknown) => string | boolean
}

export const DOIManager: React.FC = ({
  path,
  label,
  required = false,
}: Props) => {
  const { value, setValue } = useField<string>({
    path,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const { addFieldRow, dispatchFields } = useForm()

  const handleSummaryAdd = useCallback(
    (summary) => {
      addFieldRow({
        path: 'summaryField',
        rowIndex: 0,
        data: {
          summary: summary,
        },
      })
    },
    [addFieldRow],
  )

  const handleTitleAdd = useCallback(
    (titleItem) => {
      dispatchFields({ type: 'UPDATE', path: 'title', value: titleItem })
    },
    [dispatchFields],
  )

  const handleAuthorsAdd = useCallback(
    (author: string): void => {
      addFieldRow({
        path: 'authorsField',
        rowIndex: 0,
        data: {
          author: author,
        },
      })
    },
    [addFieldRow],
  )

  const handleKeywordsAdd = useCallback(
    (keyword: string) => {
      addFieldRow({
        path: 'keywordsField',
        rowIndex: 0,
        data: {
          keyword: keyword,
        },
      })
    },
    [addFieldRow],
  )

  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value)
    },
    [setValue],
  )

  const handlePaperFetch = useCallback(async () => {
    console.log('fetch paper...')
    setIsFailed(false)

    try {
      setIsLoading(true)
      const paperResponse = await summarizePaperWithDoi(value)
      const { researchPaperDetail } = await paperResponse.json()

      // console.log('paperResponse', paperResponse)
      // console.log('researchPaperDetail', researchPaperDetail)

      if (!researchPaperDetail) {
        setIsFailed(true)
        return
      }

      researchPaperDetail.keyFindings.forEach((summary) => {
        handleSummaryAdd(summary)
      })

      researchPaperDetail.authors.forEach((author) => {
        handleAuthorsAdd(author)
      })

      researchPaperDetail.keywords.forEach((keyword) => {
        handleKeywordsAdd(keyword)
      })

      handleTitleAdd(researchPaperDetail.title)
    } catch (error: unknown) {
      console.error('Error fetching paper:', error)
      setIsFailed(true)
    } finally {
      setIsLoading(false)
    }
  }, [value])

  return (
    <div className='field-type text'>
      <label className='field-label'>
        {label}
        {required && <span className='required'>*</span>}
      </label>
      <div className='doi-input-wrapper'>
        <input
          type='text'
          value={value}
          onChange={handleInputChange}
          placeholder='DOI'
        />
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small doi-fetch-button'
          onClick={handlePaperFetch}
          type='button'
        >
          {isLoading ? (
            <span className='btn-loader'>Retrieving...</span>
          ) : (
            'Fetch Paper'
          )}
        </button>
      </div>
      <div className='field-description'>
        Fetch paper details by entering a DOI. This will populate the title,
        authors, keywords, and Summary (key findings) fields.
      </div>
      <div>
        {isFailed && (
          <div className='field-error'>
            Failed to fetch paper. Please check the DOI. If the DOI is correct,
            the paper may not be available on sci-hub.
          </div>
        )}
      </div>
    </div>
  )
}
