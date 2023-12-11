import { getAllRecords } from '@/api/general'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

import Header from './Header'

// Get all records and sort them into a map, then pass the map to the Header component
const CategoriedHeader = async (): Promise<JSX.Element> => {
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

  return <Header recordsMapZh={recordsMapZh} recordsMapEn={recordsMapEn} />
}

export default CategoriedHeader
