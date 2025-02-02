'use client'

import { Fragment } from 'react'
import { CaretRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DEFAULT_LAYOUT } from '@/config/general'
import { cn } from '@/lib/utils'

interface BreadcrumbsItem {
  label: string
  url: string
  isCategory?: boolean
}
interface Props {
  items: BreadcrumbsItem[]
}

const Breadcrumbs = ({ items }: Props): JSX.Element => {
  const pathname = usePathname()
  const layout = DEFAULT_LAYOUT

  return (
    <nav className='mb-10'>
      <ol className='list-reset flex items-center'>
        {items.map(({ url, label, isCategory }, index) => {
          const isLastItem = index === items.length - 1
          const isMiddleItem = index > 0 && index < items.length - 1
          const modifiedUrl = isCategory ? `${url}?layout=${layout}` : url
          return (
            <Fragment key={url}>
              {isLastItem ? (
                <li className='w-[250px] truncate'>
                  <span
                    className={cn(
                      pathname === url
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                      'truncate',
                    )}
                  >
                    {label}
                  </span>
                </li>
              ) : (
                <li
                  key={index}
                  className={cn(isMiddleItem && 'max-w-[8rem] truncate')}
                >
                  <Link
                    href={modifiedUrl}
                    className={cn(
                      pathname === url
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                      'block truncate transition-opacity hover:opacity-50',
                    )}
                    prefetch={false}
                  >
                    {label}
                  </Link>
                </li>
              )}
              {index < items.length - 1 && (
                <span className='mx-[0.05rem] flex items-center text-muted-foreground md:mx-1.5'>
                  <CaretRightIcon className='h-4 w-4 md:h-5 md:w-5' />
                </span>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
