'use client'

import { useState } from 'react'
import Link from 'next/link'

import { HamburgerIcon, PsychedelicDBIcon } from './Icons'
import SidebarAccordion from './SidebarAccordion'
import ThemeSwitch from './ThemeSwitch'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetPortal,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

type Props = {
  recordsMapZh: RecordMap
  recordsMapEn: RecordMap
}

const SlidingSheet = ({ recordsMapEn, recordsMapZh }: Props): JSX.Element => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const sheetPortal = document.getElementById('sheet-portal')

  return (
    <div className='block md:hidden'>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger>
          <HamburgerIcon />
        </SheetTrigger>
        <SheetPortal container={sheetPortal}>
          <SheetContent className='w-[85%] sm:w-[540px]'>
            <ScrollArea className='h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]'>
              <div className='text-muted-foreground mb-8'>
                <PsychedelicDBIcon className='w-9 h-9' />
              </div>
              <div className='flex gap-3 sm:gap-3 flex-col text-base sm:text-lg mb-4 sm:mb-6'>
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
              <SidebarAccordion
                recordsMapEn={recordsMapEn}
                recordsMapZh={recordsMapZh}
                onCategoryClickedAndCloseSheet={() => setSheetOpen(false)}
              />
              <div className='flex gap-4 mt-4 items-center'>
                Switch Theme
                <ThemeSwitch />
              </div>
            </ScrollArea>
            <div className='h-16 flex justify-center items-center text-muted-foreground font-garamond'>
              Psychedelic Database
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    </div>
  )
}

export default SlidingSheet
