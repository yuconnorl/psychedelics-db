import { getAllRecords } from '@/api/general'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

import Header from './Header'

// Get all records and sort them into a map, then pass the map to the Header component
const CategoriedHeader = async (): Promise<JSX.Element> => {
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

  return <Header recordsMapZh={recordsMapZh} recordsMapEn={recordsMapEn} />
}

export default CategoriedHeader
