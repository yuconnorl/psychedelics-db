'use client'

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
  categoryTitle: string
}

const SidebarItem = ({
  category,
  records,
  onItemClicked,
  onCategoryClicked,
  openedItems,
  categoryTitle,
}: SidebarItemProps): JSX.Element => {
  const pathname = usePathname()
  const layout = DEFAULT_LAYOUT
  const currentCategory = pathname?.split('/')[2]

  const onAccordionItemClicked = (): void => {
    if (openedItems.includes(category)) {
      if (pathname === `/database/${category}`) {
        // close items
        const newItems = openedItems.filter((item) => item !== category)
        onCategoryClicked(newItems)
      }
    } else {
      // open items
      onCategoryClicked([...openedItems, category])
    }
  }

  return (
    <AccordionItem className='border-0' value={category}>
      <AccordionTrigger className='py-0 text-left'>
        <Link
          prefetch={false}
          href={`/database/${category}?layout=${layout}`}
          className={cn(
            'transition-opacity hover:opacity-40',
            currentCategory === category && 'underline underline-offset-[6px]',
          )}
        >
          <span onClick={onAccordionItemClicked}>{categoryTitle}</span>
        </Link>
      </AccordionTrigger>
      <AccordionContent className='pl-2'>
        <ol className='mt-5 flex flex-col gap-3 border-l text-base text-muted-foreground xl:gap-4'>
          {records.map((item) => (
            <li key={item.id} onClick={onItemClicked}>
              <Link
                prefetch={false}
                href={`/database/${category}/${item.slug}`}
                className={cn(
                  pathname === `/database/${category}/${item.slug}` &&
                    'border-l-[1.5px] border-foreground text-foreground',
                  '-ml-px block pl-4 transition-opacity hover:opacity-40 lg:pl-5',
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
