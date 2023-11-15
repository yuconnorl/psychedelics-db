'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CATEGORY_OPTIONS, CATEGORY_OPTIONS_MAP } from '@/config/options'

type CategoryOptionsType = (typeof CATEGORY_OPTIONS)[number]

// TODO: itemList props type
interface SidebarItemProps {
  category: CategoryOptionsType
}

const SidebarItem = ({ category, itemList }) => {
  const pathname = usePathname()

  return (
    <AccordionItem className="border-0" value={category}>
      <AccordionTrigger className="text-left py-0">
        <Link href={`/database/${category}`}>{CATEGORY_OPTIONS_MAP[category]}</Link>
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        <ol className="mt-5 flex flex-col gap-4 border-l text-base text-muted-foreground">
          {itemList.map((item) => (
            <li key={item.id}>
              <Link
                href={`/database/${category}/${item.slug}`}
                className={clsx(
                  pathname === `/database/${category}/${item.slug}` &&
                    'text-foreground border-l-[1.5px] border-foreground',
                  'hover:opacity-40 hover:underline pl-5 -ml-px block',
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
