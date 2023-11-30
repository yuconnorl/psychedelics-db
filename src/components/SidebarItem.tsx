'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DEFAULT_LAYOUT } from '@/config/general'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { CategoryOptionsType, RecordType } from '@/types'

type SidebarItemProps = {
  category: CategoryOptionsType
  records: RecordType[]
  openedItems: string[]
  onItemClicked?: () => void
  onCategoryClicked: (items: string[]) => void
}

const SidebarItem = ({
  category,
  records,
  onItemClicked = () => {},
  onCategoryClicked,
  openedItems,
}: SidebarItemProps): JSX.Element => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const layout = searchParams.get('layout') || DEFAULT_LAYOUT

  return (
    <AccordionItem
      onClick={() => onCategoryClicked([...openedItems, category])}
      className='border-0'
      value={category}
    >
      <AccordionTrigger className='text-left py-0'>
        <Link href={`/database/${category}?layout=${layout}`}>
          <span>{CATEGORY_OPTIONS_MAP[category]}</span>
        </Link>
      </AccordionTrigger>
      <AccordionContent className='pl-2'>
        <ol className='mt-5 flex flex-col gap-3 xl:gap-4 border-l text-base text-muted-foreground'>
          {records.map((item) => (
            <li key={item.id} onClick={onItemClicked}>
              <Link
                href={`/database/${category}/${item.slug}`}
                className={clsx(
                  pathname === `/database/${category}/${item.slug}` &&
                    'text-foreground border-l-[1.5px] border-foreground',
                  'hover:opacity-40 hover:underline pl-4 lg:pl-5 -ml-px block',
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
      </AccordionContent>
    </AccordionItem>
  )
}

export default SidebarItem
