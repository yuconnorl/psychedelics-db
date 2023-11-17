'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

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
    <header className="px-10 py-4 sticky border-b top-0 w-full items-center bg-background/90 supports-[backdrop-filter]:bg-background/60 backdrop-blur z-50">
      <div className="container flex items-center gap-3 w-full justify-between">
        <div className="">
          <Image src={'/psyche-icon.png'} alt="awe" width={60} height={60} />
        </div>
        <div className="flex gap-5 items-center justify-around">
          <div className="flex gap-5 items-center">
            <Link href={'/database'}>Database</Link>
            <Link href={'/about'}>About</Link>
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
      </div>
    </header>
  )
}

export default Header
