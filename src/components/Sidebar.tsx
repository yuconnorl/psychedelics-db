import Link from 'next/link'

import { getAllRecords } from '@/api/general'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CATEGORY_OPTIONS } from '@/config/options'

type CategoryOptionsType = (typeof CATEGORY_OPTIONS)[number]

// TODO: itemList props type
interface SidebarItemProps {
  category: CategoryOptionsType
}

const SidebarItem = ({ category, itemList }) => {
  return (
    <AccordionItem key={category} className="border-0" value={category}>
      <AccordionTrigger className="text-left py-0">
        <Link href={`/database/${category}`}>{category}</Link>
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        <div className="pl-5 mt-5 border-l flex flex-col gap-4 text-base">
          {itemList.map(item => (
            <Link
              key={item.slug}
              href={`/database/${category}/${item.slug}`}
              className=" hover:opacity-40"
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
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <Accordion
        className="relative overflow-hidden h-full py-6 pl-8 pr-6 lg:py-8 flex flex-col gap-4"
        type="multiple"
      >
        {Object.keys(recordsMap).map(category => (
          <SidebarItem category={category} itemList={recordsMap[category]} />
        ))}
      </Accordion>
    </aside>
  )
}

export default Sidebar
