'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Hamburger } from './Icons'
import SidebarItem from './SidebarItem'
import ThemeSwitch from './ThemeSwitch'

import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

type Props = {
  recordsMapZh: RecordMap
  recordsMapEn: RecordMap
}

const Header = ({ recordsMapZh, recordsMapEn }: Props): JSX.Element => {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className='py-4 sticky border-b top-0 w-full items-center bg-background/90 supports-[backdrop-filter]:bg-background/60 backdrop-blur z-50'>
      <div className='container px-6 lg:pr-8 lg:pl-10 flex items-center gap-3 w-full justify-between'>
        <div className='flex gap-2 items-center'>
          <Link className='hover:opacity-40 transition-opacity' href={'/'}>
            <span className='font-garamond text-xl md:text-2xl'>
              Psychedelic Database
            </span>
          </Link>
        </div>
        <div className='hidden md:flex gap-3 md:gap-5 items-center justify-around'>
          <div className='md:flex gap-3 md:gap-5 items-center'>
            <Link
              href={'/database'}
              className='hover:opacity-40 transition-opacity'
            >
              Database
            </Link>
            <Link
              href={'/about'}
              className='hover:opacity-40 transition-opacity'
            >
              About
            </Link>
          </div>
          <ThemeSwitch />
        </div>
        <div className='md:hidden flex'>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Hamburger />
            </SheetTrigger>
            <SheetContent className='w-[85%] sm:w-[540px]'>
              <ScrollArea className='h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]'>
                <div className='font-garamond text-muted-foreground mb-8 text-xl'>
                  Psychedelic Database
                </div>
                <div className='flex gap-3 flex-col text-lg mb-8'>
                  <Link
                    href={'/database'}
                    className='hover:opacity-40 transition-opacity'
                  >
                    Database
                  </Link>
                  <Link
                    href={'/about'}
                    className='hover:opacity-40 transition-opacity'
                  >
                    About
                  </Link>
                </div>
                <div className='text-muted-foreground text-base'>
                  Categories
                </div>
                <Accordion
                  className='relative overflow-hidden h-full py-6 lg:pl-4 pr-4 lg:py-8 flex flex-col gap-3 xl:gap-4'
                  type='multiple'
                >
                  {Object.keys(recordsMapZh).map(
                    (category: CategoryOptionsType) => (
                      <SidebarItem
                        key={category}
                        category={category}
                        records={recordsMapZh[category]}
                        onItemClicked={() => setSheetOpen(false)}
                      />
                    ),
                  )}
                  <Separator className='my-4 w-[90%] self-center' />
                  {Object.keys(recordsMapEn).map(
                    (category: CategoryOptionsType) => (
                      <SidebarItem
                        key={category}
                        category={category}
                        records={recordsMapEn[category]}
                        onItemClicked={() => setSheetOpen(false)}
                      />
                    ),
                  )}
                </Accordion>
                <div className='flex gap-4 mt-4 items-center'>
                  Switch Theme
                  <ThemeSwitch />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
