import Link from 'next/link'

import { getAllRecords } from '@/api/general'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CATEGORY_OPTIONS, CATEGORY_OPTIONS_MAP } from '@/config/options'

type CategoryOptionsType = (typeof CATEGORY_OPTIONS)[number]

// TODO: itemList props type
interface SidebarItemProps {
  category: CategoryOptionsType
}

const SidebarItem = ({ category, itemList }) => {
  return (
    <AccordionItem className="border-0" value={category}>
      <AccordionTrigger className="text-left py-0">
        <Link href={`/database/${category}`}>{CATEGORY_OPTIONS_MAP[category]}</Link>
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        <div className="pl-5 mt-5 border-l flex flex-col gap-4 text-base">
          {itemList.map(item => (
            <Link
              key={item.slug}
              href={`/database/${category}/${item.slug}`}
              className="hover:opacity-40 hover:underline text-muted-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

const Sidebar = async () => {
  const recordsMap = {}
  const records = await getAllRecords()

  records.forEach(record => {
    if (recordsMap[record.category]) {
      recordsMap[record.category].push(record)
    } else {
      recordsMap[record.category] = [record]
    }
  })

  return (
    <aside className="fixed top-10 z-30 hidden w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]">
        <Accordion
          className="relative overflow-hidden h-full py-6 pl-6 pr-4 lg:py-8 flex flex-col gap-4"
          type="multiple"
        >
          {Object.keys(recordsMap).map(category => (
            <SidebarItem key={category} category={category} itemList={recordsMap[category]} />
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
