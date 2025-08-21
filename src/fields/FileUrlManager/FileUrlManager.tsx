import React, { useCallback, useState } from 'react'
import {
  reduceFieldsToValues,
  useAllFormFields,
  useField,
  useForm,
  useFormFields,
} from 'payload/components/forms'

import {
  summarizePaperWithPdfFile,
  summarizePaperWithUrl,
  translateSummaries,
} from '../../utilities/paperDetail'

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
  const [pdfData, setPdfData] = useState(null)
  const [pdfDisplayValue, setPdfDisplayValue] = useState('')
  const { addFieldRow, dispatchFields } = useForm()
  const [allFields, dispatchAllFields] = useAllFormFields()
  const formData = reduceFieldsToValues(allFields, true)

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

  const handleSummaryHantAdd = useCallback(
    (summary) => {
      addFieldRow({
        path: 'summaryZhTwField',
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

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = function (event) {
          const arrayBuffer = event.target?.result as ArrayBuffer
          setPdfData(arrayBuffer)
        }
        reader.readAsArrayBuffer(file)
      }

      setPdfDisplayValue(e.target.value)
      setValue('local-file.pdf')
    },
    [setValue],
  )

  const handlePdfRetrieve = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log('📖 fetch pdf...')

    try {
      setIsLoading(true)
      const paperResponse = await summarizePaperWithPdfFile(pdfData)
      const { researchPaperDetail } = await paperResponse.json()

      researchPaperDetail.keyFindings.forEach((summary) => {
        handleSummaryAdd(summary)
      })

      researchPaperDetail.keyFindingsZhTw.forEach((summary) => {
        handleSummaryHantAdd(summary)
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
      // eslint-disable-next-line no-console
      console.error('Error fetching paper:', error)
      setIsFailed(true)
    } finally {
      setIsLoading(false)
    }
  }, [
    handleAuthorsAdd,
    handleKeywordsAdd,
    handleJournalAdd,
    handleSummaryHantAdd,
    handleSlugAdd,
    handleSummaryAdd,
    handleTitleAdd,
    pdfData,
  ])

  // translate summaries
  const handleSummaryTranslate = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log('📖 Translating...')

    console.log('formData', formData)

    const summariesArray = formData.summaryField.map(
      (summary) => summary.summary,
    )

    console.log('summariesString -------', summariesArray)

    try {
      setIsLoading(true)
      const translateResponse = await translateSummaries(summariesArray)

      // const { researchPaperDetail } = await paperResponse.json()

      // console.log('researchPaperDetail', researchPaperDetail)

      // researchPaperDetail.keyFindings.forEach((summary) => {
      //   handleSummaryAdd(summary)
      // })

      // researchPaperDetail.keyFindingsZhTw.forEach((summary) => {
      //   handleSummaryHantAdd(summary)
      // })
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Error fetching paper:', error)
      setIsFailed(true)
    } finally {
      setIsLoading(false)
    }
  }, [handleSummaryHantAdd, formData])

  const handlePaperFetch = useCallback(async () => {
    // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
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
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3'>
          <input
            type='text'
            value={value}
            onChange={handleInputChange}
            placeholder='File Url'
          />
          <button
            className='btn btn--style-primary btn--icon-style-without-border btn--size-small my-0 whitespace-nowrap py-3 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={handlePaperFetch}
            type='button'
            disabled={isLoading || !value}
          >
            {isLoading ? (
              <span className='btn-loader'>Retrieving...</span>
            ) : (
              'Fetch Paper'
            )}
          </button>
        </div>
        <div className='flex items-center gap-3'>
          <input
            type='file'
            value={pdfDisplayValue}
            onChange={handleFileInputChange}
            placeholder='upload file'
            className='file:border-0 file:bg-transparent file:text-base file:font-bold file:text-foreground placeholder:text-muted-foreground'
          />
          <button
            className='btn btn--style-primary btn--icon-style-without-border btn--size-small my-0 whitespace-nowrap py-3 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={handlePdfRetrieve}
            type='button'
            disabled={isLoading || !pdfData}
          >
            {isLoading ? (
              <span className='btn-loader'>Retrieving...</span>
            ) : (
              'Retrieve PDF Info'
            )}
          </button>
          <button
            className='btn btn--style-primary btn--icon-style-without-border btn--size-small my-0 whitespace-nowrap py-3 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={handleSummaryTranslate}
            type='button'
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='btn-loader'>Retrieving...</span>
            ) : (
              'Translate'
            )}
          </button>
        </div>
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
