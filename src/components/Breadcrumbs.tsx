'use client'

import { CaretRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { DEFAULT_LAYOUT } from '@/config/general'

const Breadcrumbs = ({ items }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const layout = searchParams.get('layout') || DEFAULT_LAYOUT

  return (
    <nav className="mb-10">
      <ol className="list-reset flex">
        {items.map(({ url, label, isCategory }, index) => {
          const isLastItem = index === items.length - 1
          const modifiedUrl = isCategory ? `${url}?layout=${layout}` : url

          return (
            <>
              {isLastItem ? (
                <li key={index}>
                  <div
                    className={clsx(
                      pathname === url ? 'text-foreground' : 'text-muted-foreground',
                      'truncate',
                    )}
                  >
                    {label}
                  </div>
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
                <span className="mx-1.5 text-muted-foreground flex items-center">
                  <CaretRightIcon height={22} width={22} />
                </span>
              )}
            </>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
