'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HamburgerIcon, PsychedelicDBIcon } from './Icons'
import SidebarAccordion from './SidebarAccordion'
import ThemeSwitch from './ThemeSwitch'

import AlgoliaSearchComponent from '@/components/algolia/AlgoliaSearchComponent'
import IconsWithSprite from '@/components/IconsWithSprite'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetPortal,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SITE_NAME } from '@/constants/constants'
import { cn } from '@/lib/utils'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

type Props = {
  recordsMapZh: RecordMap
  recordsMapEn: RecordMap
  categoriesMap: Object
}

const Header = ({
  recordsMapZh,
  recordsMapEn,
  categoriesMap,
}: Props): JSX.Element => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const pathname = usePathname()
  const sheetPortalRef = useRef(null)
  const isRoot = pathname === '/'
  const currentCategory = pathname?.split('/')[1]

  useEffect(() => {
    const sheetPortalContainer = document.getElementById(
      'sheet-portal-container',
    )
    sheetPortalRef.current = sheetPortalContainer
  }, [])

  return (
    <header
      className={cn(
        'pt-[1.85rem] pb-6 sticky top-0 w-full items-center bg-background/90 supports-[backdrop-filter]:bg-background/60 backdrop-blur z-50',
        !isRoot && 'border-b py-3 sm:py-6',
      )}
    >
      <div className='container px-6 lg:pr-8 lg:pl-10 flex items-center gap-3 w-full justify-between'>
        <div className='flex gap-2 items-center'>
          <Link
            className='hover:opacity-40 transition-opacity flex gap-1 md:gap-1.5 items-center'
            href={'/'}
          >
            <PsychedelicDBIcon className='w-6 h-6 md:w-7 md:h-7' />
            <span className='font-garamond text-base sm:text-lg md:text-xl'>
              {SITE_NAME}
            </span>
          </Link>
        </div>
        <div className='flex items-center gap-1.5 md:gap-5'>
          {!isRoot && (
            <AlgoliaSearchComponent searchBarClassName='w-52 lg:w-60' />
          )}
          <div className='hidden md:flex gap-3 md:gap-5 items-center justify-around'>
            <div className='md:flex gap-3 md:gap-5 items-center text-foreground/70'>
              <Link
                href={'/database'}
                className={cn(
                  currentCategory === 'database' &&
                    'underline underline-offset-4',
                  'hover:opacity-40 transition-opacity',
                )}
              >
                Database
              </Link>
              <Link
                href={'/research'}
                className={cn(
                  currentCategory === 'research' &&
                    'underline underline-offset-4',
                  'hover:opacity-40 transition-opacity',
                )}
              >
                Research
              </Link>
              <Link
                href={'/about'}
                className={cn(
                  currentCategory === 'about' && 'underline underline-offset-4',
                  'hover:opacity-40 transition-opacity',
                )}
              >
                About
              </Link>
            </div>
            <Separator orientation='vertical' className='h-6 w-[1.6px]' />
            <div className='flex gap-3 md:gap-5 items-center'>
              <ThemeSwitch />
              <Link
                href={'https://tinyurl.com/3fr2ddu7'}
                target='_blank'
                className='group block'
              >
                <IconsWithSprite
                  id={'telegram'}
                  viewBox='0 0 71 59'
                  class='text-primary group-hover:text-primary/50 transition-colors w-6 h-6'
                />
                {/* <TelegramIcon className='text-primary group-hover:text-primary/50 transition-colors' /> */}
              </Link>
            </div>
          </div>
          <Link
            href={'https://tinyurl.com/3fr2ddu7'}
            target='_blank'
            className='block mr-3 md:hidden'
          >
            <IconsWithSprite
              id={'telegram'}
              viewBox='0 0 71 59'
              class='text-primary w-5 h-5'
            />
          </Link>
          <div className='flex md:hidden'>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger>
                <HamburgerIcon />
              </SheetTrigger>
              <SheetPortal container={sheetPortalRef.current}>
                <SheetContent className='w-[85%] sm:w-[540px] grid grid-rows-[calc(100dvh-6rem)_1fr]'>
                  <ScrollArea className='h-full'>
                    <div className='text-muted-foreground mb-8'>
                      <PsychedelicDBIcon className='w-9 h-9' />
                    </div>
                    <div className='flex gap-3 sm:gap-3 flex-col text-base sm:text-lg mb-4 sm:mb-6'>
                      <Link
                        href={'/database'}
                        className='hover:opacity-40 transition-opacity'
                      >
                        <span
                          onClick={(): void => setSheetOpen(false)}
                          className={cn(
                            currentCategory === 'database' &&
                              'underline underline-offset-4',
                          )}
                        >
                          Database
                        </span>
                      </Link>
                      <Link
                        href={'/research'}
                        className='hover:opacity-40 transition-opacity'
                      >
                        <span
                          onClick={(): void => setSheetOpen(false)}
                          className={cn(
                            currentCategory === 'research' &&
                              'underline underline-offset-4',
                          )}
                        >
                          Research
                        </span>
                      </Link>
                      <Link
                        href={'/about'}
                        className='hover:opacity-40 transition-opacity'
                      >
                        <span
                          onClick={(): void => setSheetOpen(false)}
                          className={cn(
                            currentCategory === 'about' &&
                              'underline underline-offset-4',
                          )}
                        >
                          About
                        </span>
                      </Link>
                    </div>
                    <SidebarAccordion
                      recordsMapEn={recordsMapEn}
                      recordsMapZh={recordsMapZh}
                      categoriesMap={categoriesMap}
                      onCategoryClickedAndCloseSheet={() => setSheetOpen(false)}
                    />
                    <div className='flex gap-4 my-4 items-center'>
                      Switch Theme
                      <ThemeSwitch />
                    </div>
                  </ScrollArea>
                  <div className='flex justify-center items-center text-muted-foreground font-garamond'>
                    Psychedelics Database
                  </div>
                </SheetContent>
              </SheetPortal>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
