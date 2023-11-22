'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import SlidingPanel from './SlidingPanel'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Header = (): JSX.Element => {
  const { setTheme } = useTheme()

  return (
    <header className="py-4 sticky border-b top-0 w-full items-center bg-background/90 supports-[backdrop-filter]:bg-background/60 backdrop-blur z-50">
      <div className="container px-6 lg:pr-8 lg:pl-10 flex items-center gap-3 w-full justify-between">
        <div className="flex gap-2 items-center">
          <Link className="hover:opacity-40 transition-opacity" href={'/'}>
            <span className="font-garamond text-xl md:text-2xl">Psychedelic Database</span>
          </Link>
        </div>
        <div className="flex gap-3 md:gap-5 items-center justify-around">
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href={'/database'} className="hover:opacity-40 transition-opacity">
              Database
            </Link>
            <Link href={'/about'} className="hover:opacity-40 transition-opacity">
              About
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SlidingPanel></SlidingPanel>
      </div>
    </header>
  )
}

export default Header
