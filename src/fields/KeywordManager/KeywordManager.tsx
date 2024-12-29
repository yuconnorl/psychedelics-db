import React, { useCallback, useState } from 'react'
import { useForm } from 'payload/components/forms'

export const KeywordManager: React.FC = () => {
  const { addFieldRow, removeFieldRow } = useForm()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

  const handleMultiEntriesAdd = useCallback(() => {
    const keywords = inputValue.split(',').map((keyword) => keyword.trim())

    keywords.forEach((keyword, index) => {
      addFieldRow({
        path: 'keywordsField',
        rowIndex: index,
        data: {
          keyword: keyword,
        },
      })
    })

    setInputValue('')
  }, [inputValue, addFieldRow])

  const handleEntryRemove = useCallback(() => {
    removeFieldRow({
      path: 'keywordsField',
      rowIndex: 0,
    })
  }, [removeFieldRow])

  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && inputValue.trim() !== '') {
        e.preventDefault()
        handleMultiEntriesAdd()
      }
    },
    [inputValue, handleMultiEntriesAdd],
  )

  return (
    <div className='field-type text'>
      <div>Add Keyword</div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder='Type and press Enter to add keyword'
      />
      <div className='field-description'>
        To add multiple entries, seperate them with a comma, e.g. "apple,
        orange, banana", then press Enter or click 'Add Row' button.
      </div>
      <div className='flex gap-2'>
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small'
          onClick={handleMultiEntriesAdd}
          type='button'
        >
          Add Row
        </button>
        <button
          className='btn btn--style-primary btn--icon-style-without-border btn--size-small'
          onClick={handleEntryRemove}
          type='button'
        >
          Remove Row
        </button>
      </div>
    </div>
  )
}
