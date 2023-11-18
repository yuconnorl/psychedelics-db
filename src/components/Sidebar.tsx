import SidebarItem from './SidebarItem'

import { getAllRecords } from '@/api/general'
import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

const Sidebar = async (): Promise<JSX.Element> => {
  const recordsMap = {} as RecordMap
  const records = await getAllRecords()

  records
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((record) => {
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
          defaultValue={['ngo-foundation', 'private-research-institute']}
        >
          {Object.keys(recordsMap).map((category: CategoryOptionsType) => (
            <SidebarItem key={category} category={category} records={recordsMap[category]} />
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
