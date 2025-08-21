'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HamburgerIcon, PsychedelicDBIcon, TelegramIcon } from './Icons'
import SidebarAccordion from './SidebarAccordion'
import ThemeSwitch from './ThemeSwitch'

import AlgoliaSearchComponent from '@/components/algolia/AlgoliaSearchComponent'
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

// FIXME: categoriesMap type
type Props = {
  recordsMapZh: RecordMap
  recordsMapEn: RecordMap
  categoriesMap: any
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
        'sticky top-0 z-50 w-full items-center bg-background/90 pb-6 pt-[1.85rem] backdrop-blur supports-[backdrop-filter]:bg-background/60',
        !isRoot && 'border-b py-3 sm:py-6',
      )}
    >
      <div className='container flex w-full items-center justify-between gap-3 px-6 lg:pl-10 lg:pr-8'>
        <div className='flex items-center gap-2'>
          <Link
            className='flex items-center gap-1 transition-opacity hover:opacity-40 md:gap-1.5'
            href={'/'}
          >
            <PsychedelicDBIcon className='h-6 w-6 md:h-7 md:w-7' />
            <span className='font-garamond text-base sm:text-lg md:text-xl'>
              {SITE_NAME}
            </span>
          </Link>
        </div>
        <div className='flex items-center gap-1.5 md:gap-5'>
          {!isRoot && (
            <AlgoliaSearchComponent searchBarClassName='w-52 lg:w-60' />
          )}
          <div className='hidden items-center justify-around gap-3 md:flex md:gap-5'>
            <div className='items-center gap-3 text-foreground/70 md:flex md:gap-5'>
              <Link
                href={'/database'}
                className={cn(
                  currentCategory === 'database' &&
                    'text-foreground underline underline-offset-4',
                  'transition-opacity hover:opacity-40',
                )}
              >
                Database
              </Link>
              <Link
                href={'/research'}
                className={cn(
                  currentCategory === 'research' &&
                    'text-foreground underline underline-offset-4',
                  'transition-opacity hover:opacity-40',
                )}
              >
                Research
              </Link>
              <Link
                href={'/about'}
                prefetch={false}
                className={cn(
                  currentCategory === 'about' &&
                    'text-foreground underline underline-offset-4',
                  'transition-opacity hover:opacity-40',
                )}
              >
                About
              </Link>
            </div>
            <Separator orientation='vertical' className='h-6 w-[1.6px]' />
            <div className='flex items-center gap-3 md:gap-5'>
              <ThemeSwitch />
              <Link
                href={'https://tinyurl.com/3fr2ddu7'}
                target='_blank'
                className='group block'
                prefetch={false}
              >
                <TelegramIcon className='text-primary transition-colors group-hover:text-primary/50' />
              </Link>
            </div>
          </div>
          <Link
            href={'https://tinyurl.com/3fr2ddu7'}
            target='_blank'
            className='mr-3 block md:hidden'
            prefetch={false}
          >
            <TelegramIcon className='h-5 w-5 text-primary' />
          </Link>
          <div className='flex md:hidden'>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger>
                <HamburgerIcon />
              </SheetTrigger>
              <SheetPortal container={sheetPortalRef.current}>
                <SheetContent className='grid w-[85%] grid-rows-[calc(100dvh-6rem)_1fr] sm:w-[540px]'>
                  <ScrollArea className='h-full'>
                    <div className='mb-8 text-muted-foreground'>
                      <PsychedelicDBIcon className='h-9 w-9' />
                    </div>
                    <div className='mb-4 flex flex-col gap-3 text-base sm:mb-6 sm:gap-3 sm:text-lg'>
                      <Link
                        href={'/database'}
                        className='transition-opacity hover:opacity-40'
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
                        className='transition-opacity hover:opacity-40'
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
                        className='transition-opacity hover:opacity-40'
                        prefetch={false}
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
                    <div className='my-4 flex items-center gap-4'>
                      Switch Theme
                      <ThemeSwitch />
                    </div>
                  </ScrollArea>
                  <div className='flex items-center justify-center font-garamond text-muted-foreground'>
                    PsycheVault
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
