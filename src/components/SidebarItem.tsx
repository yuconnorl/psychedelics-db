'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DEFAULT_LAYOUT } from '@/config/general'
import { CATEGORY_OPTIONS_MAP } from '@/config/options'
import { cn } from '@/lib/utils'
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
  onItemClicked = (): void => {},
  onCategoryClicked,
  openedItems,
}: SidebarItemProps): JSX.Element => {
  const pathname = usePathname()
  const layout = DEFAULT_LAYOUT
  const currentCategory = pathname?.split('/')[2]

  const onAccordionItemClicked = (): void => {
    if (openedItems.includes(category)) {
      if (pathname === `/database/${category}`) {
        // close items
        let newItems = openedItems.filter((item) => item !== category)
        onCategoryClicked(newItems)
      }
    } else {
      // open items
      onCategoryClicked([...openedItems, category])
    }
  }

  return (
    <AccordionItem className='border-0' value={category}>
      <AccordionTrigger className='text-left py-0'>
        <Link
          href={`/database/${category}?layout=${layout}`}
          className={cn(
            'hover:opacity-40 transition-opacity',
            currentCategory === category && 'underline underline-offset-[6px]',
          )}
        >
          <span onClick={onAccordionItemClicked}>
            {CATEGORY_OPTIONS_MAP[category]}
          </span>
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
                  'hover:opacity-40 pl-4 lg:pl-5 -ml-px block transition-opacity',
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
