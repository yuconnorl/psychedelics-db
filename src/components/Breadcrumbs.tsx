'use client'
import { Fragment } from 'react'
import { CaretRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { DEFAULT_LAYOUT } from '@/config/general'

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
  const searchParams = useSearchParams()
  const layout = searchParams.get('layout') || DEFAULT_LAYOUT

  return (
    <nav className="mb-10">
      <ol className="list-reset flex flex-wrap items-center">
        {items.map(({ url, label, isCategory }, index) => {
          const isLastItem = index === items.length - 1
          const modifiedUrl = isCategory ? `${url}?layout=${layout}` : url
          return (
            <Fragment key={url}>
              {isLastItem ? (
                <li className="truncate w-[250px]">
                  <span
                    className={clsx(
                      pathname === url ? 'text-foreground' : 'text-muted-foreground',
                      'truncate',
                    )}
                  >
                    {label}
                  </span>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    href={modifiedUrl}
                    className={clsx(
                      pathname === url ? 'text-foreground' : 'text-muted-foreground',
                      'truncate hover:opacity-50 transition-opacity',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              )}
              {index < items.length - 1 && (
                <span className="mx-1 md:mx-1.5 text-muted-foreground flex items-center">
                  <CaretRightIcon className="h-4 w-4 md:h-5 md:w-5" />
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
