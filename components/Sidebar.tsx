import SidebarAccordion from './SidebarAccordion'

import { getAllRecords } from '@api/general'
import { ScrollArea } from '@components/ui/scroll-area'
import { CategoryOptionsType, RecordType } from '@types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

const Sidebar = async (): Promise<JSX.Element> => {
  const recordsMapEn = {} as RecordMap
  const recordsMapZh = {} as RecordMap
  const records = await getAllRecords()

  const processRecords = (data, map) => {
    data
      .sort((a, b) => a.title.localeCompare(b.title))
      .forEach((record) => {
        map[record.category] = map[record.category] || []
        map[record.category].push(record)
      })
  }

  processRecords(
    records.filter((record) => record.language === 'zh-tw'),
    recordsMapZh,
  )
  processRecords(
    records.filter((record) => record.language === 'en'),
    recordsMapEn,
  )

  return (
    <aside className='fixed top-10 z-30 hidden w-full shrink-0 md:sticky md:block'>
      <ScrollArea className='h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]'>
        <SidebarAccordion
          recordsMapEn={recordsMapEn}
          recordsMapZh={recordsMapZh}
        />
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
