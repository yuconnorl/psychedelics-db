'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// ref: https://github.com/anatoliygatt/dark-mode-toggle/tree/master
// unchecked: dark
// checked: light
const ThemeSwitch = (): JSX.Element => {
  const { setTheme, theme } = useTheme()
  const [isChecked, setIsChecked] = useState(true)

  const onThemeSwitch = () => {
    if (isChecked) {
      setIsChecked(false)
      setTheme('dark')
    } else {
      setIsChecked(true)
      setTheme('light')
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }, [theme])

  return (
    <>
      <label className='sr-only'>Theme</label>
      <button
        aria-checked={isChecked}
        type='button'
        role='switch'
        data-state={isChecked ? 'checked' : 'unchecked'}
        onClick={onThemeSwitch}
        className='relative peer dark-before dark-after inline-flex h-7 w-12 cursor-pointer items-center rounded-full border border-muted-foreground/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-input data-[state=unchecked]:bg-foreground'
      />
    </>
  )
}

export default ThemeSwitch
