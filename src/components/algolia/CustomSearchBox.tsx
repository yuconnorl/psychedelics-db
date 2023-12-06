/* eslint-disable import/named */
import React, { useEffect, useRef, useState } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch'

import { SearchIcon } from '../Icons'

const CustomSearchBox = (props: UseSearchBoxProps): JSX.Element => {
  const { query, refine, clear } = useSearchBox(props)
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  function debounce(fn, delay = 500) {
    return (...args) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }

  const setQuery = debounce((newQuery: string) => {
    if (newQuery !== '') refine(newQuery)
  })

  useEffect(() => {
    return () => clear()
  }, [clear])

  return (
    <div className='flex items-center gap-3 p-6 border-b relative'>
      <SearchIcon className='text-muted-foreground' />
      <form
        className='flex-1'
        action=''
        role='search'
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()

          if (inputRef.current) {
            inputRef.current.blur()
          }
        }}
        onReset={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setQuery('')

          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <input
          className='w-full border-none outline-none bg-transparent'
          ref={inputRef}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          placeholder='Open the door...'
          spellCheck={false}
          maxLength={30}
          type='search'
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.currentTarget.value)
            setQuery(event.currentTarget.value)
          }}
          autoFocus
        />
      </form>
    </div>
  )
}

export default CustomSearchBox
