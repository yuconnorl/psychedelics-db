import React, { useCallback, useState } from 'react'
import { useField, useForm } from 'payload/components/forms'

import { summarizePaperWithUrl } from '../../utilities/paperDetail'

type Props = {
  path: string
  required?: boolean
  label?: string
  validate?: (value: unknown) => string | boolean
}

export const FileUrlManager: React.FC = ({
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

  const handleJournalAdd = useCallback(
    (journal) => {
      dispatchFields({ type: 'UPDATE', path: 'journal', value: journal })
    },
    [dispatchFields],
  )

  const handleSlugAdd = useCallback(
    (titleItem) => {
      const formatTitle = (val: string): string => {
        if (!val) return ''
        return val
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .toLowerCase()
      }

      const formatedTitle = formatTitle(titleItem) || ''
      dispatchFields({ type: 'UPDATE', path: 'slug', value: formatedTitle })
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
    console.log('📖 fetch paper...')

    try {
      setIsLoading(true)
      const paperResponse = await summarizePaperWithUrl(value)
      const { researchPaperDetail } = await paperResponse.json()

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
      handleSlugAdd(researchPaperDetail.title)
      handleJournalAdd(researchPaperDetail.journal)
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
          placeholder='File Url'
        />
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small doi-fetch-button disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handlePaperFetch}
          type='button'
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='btn-loader'>Retrieving...</span>
          ) : (
            'Fetch Paper'
          )}
        </button>
      </div>
      <div className='field-description'>
        Url to paper source (e.g. sci-hub). Fetch paper details by entering link
        to the paper. This will populate the title, authors, keywords, slug and
        Summary (key findings) fields.
      </div>
      <div>
        {isFailed && (
          <div className='field-error'>
            Failed to fetch paper. Please check the DOI
          </div>
        )}
      </div>
    </div>
  )
}
