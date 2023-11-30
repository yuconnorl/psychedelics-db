import SidebarAccordion from './SidebarAccordion'

import { getAllRecords } from '@/api/general'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

const Sidebar = async (): Promise<JSX.Element> => {
  const recordsMapEn = {} as RecordMap
  const recordsMapZh = {} as RecordMap
  const records = await getAllRecords()

  const mandarinData = records.filter((record) => record.language === 'zh-tw')
  const englishData = records.filter((record) => record.language === 'en')

  mandarinData
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((record) => {
      recordsMapZh[record.category]
        ? recordsMapZh[record.category].push(record)
        : (recordsMapZh[record.category] = [record])
    })

  englishData
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((record) => {
      recordsMapEn[record.category]
        ? recordsMapEn[record.category].push(record)
        : (recordsMapEn[record.category] = [record])
    })

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
