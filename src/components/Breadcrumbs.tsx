'use client'

import { CaretRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumbs = ({ items }) => {
  const pathname = usePathname()

  return (
    <nav className="mb-10">
      <ol className="list-reset flex">
        {items.map((item, index) => (
          <>
            <li key={index}>
              <Link
                href={item.url}
                className={clsx(
                  pathname === item.url ? 'text-foreground' : 'text-muted-foreground',
                  'truncate hover:opacity-50 transition-opacity',
                )}
              >
                {item.label}
              </Link>
            </li>
            {index < items.length - 1 && (
              <span className="mx-1.5 text-muted-foreground flex items-center">
                <CaretRightIcon height={22} width={22} />
              </span>
            )}
          </>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
