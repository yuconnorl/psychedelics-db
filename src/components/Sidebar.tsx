import SidebarItem from './SidebarItem'

import { getAllRecords } from '@/api/general'
import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

const Sidebar = async (): Promise<JSX.Element> => {
  const defaultOpenItem = ['mandarin-social-media', 'ngo-foundation']
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
        <Accordion
          className='relative overflow-hidden h-full py-6 lg:pl-4 pr-4 lg:py-8 flex flex-col gap-3 xl:gap-4'
          type='multiple'
          defaultValue={defaultOpenItem}
        >
          {Object.keys(recordsMapZh).map((category: CategoryOptionsType) => (
            <SidebarItem
              key={category}
              category={category}
              records={recordsMapZh[category]}
            />
          ))}
          <Separator className='my-4 w-[90%] self-center' />
          {Object.keys(recordsMapEn).map((category: CategoryOptionsType) => (
            <SidebarItem
              key={category}
              category={category}
              records={recordsMapEn[category]}
            />
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
