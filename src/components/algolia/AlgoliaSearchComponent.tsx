'use client'

import { useEffect, useState } from 'react'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AlgoliaLogoIcon, SearchIcon } from '../Icons'
import SearchButton from '../SearchButton'
import searchClient from './algoliaSearchClient'
import CustomHits from './CustomHits'
import CustomSearchBox from './CustomSearchBox'
import NoResultsBoundary from './NoResultsBoundary'
import NoResultsFallback from './NoResultsFallback'

import { Dialog, DialogContent } from '@/components/CustomDialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SearchButtonProps = {
  searchBarClassName?: string
  searchIconClassName?: string
}

const AlgoliaSearchComponent = ({
  searchBarClassName,
  searchIconClassName,
}: SearchButtonProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isRoot = pathname === '/'

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <SearchButton
        className={cn('hidden md:flex', searchBarClassName)}
        onButtonClick={setOpen}
      />
      <Button
        variant='ghost'
        size='icon'
        className={cn('md:hidden', searchIconClassName)}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className='h-[1.35rem] w-[1.35rem] text-primary' />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <InstantSearchNext
            indexName='psychedelics_db'
            searchClient={searchClient}
          >
            <CustomSearchBox />
            <NoResultsBoundary fallback={<NoResultsFallback />}>
              <CustomHits onHitClick={setOpen} />
            </NoResultsBoundary>
          </InstantSearchNext>
          <div className='border-t items-center px-6 py-4 flex justify-end'>
            <Link
              href={'https://www.algolia.com/ref/docsearch'}
              className='flex items-center text-primary/50'
            >
              <p className='text-muted-foreground text-xs mr-3 opacity-50'>
                Search by
              </p>
              <AlgoliaLogoIcon />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AlgoliaSearchComponent
