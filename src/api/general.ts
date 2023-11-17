import type { RecordType } from '@/types'

export const getAllRecords = async (limit = 100): Promise<RecordType[]> => {
  const req = await fetch(`${process.env.PAYLOAD_CMS_URL}?limit=${limit}`)
  const data = await req.json()

  return data?.docs
}
