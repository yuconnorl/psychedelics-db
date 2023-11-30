import qs from 'qs'

import { getPayloadClient } from '@/getPayload'
import type { RecordType } from '@/types'

export const getAllRecords = async (limit = 300): Promise<RecordType[]> => {
  const stringifiedQuery = qs.stringify(
    {
      where: {
        isRecordShow: {
          equals: true,
        },
      },
    },
    { addQueryPrefix: true },
  )

  const response = await fetch(
    `http://localhost:3000/api/records${stringifiedQuery}&limit=${limit}`,
  )
  const data = await response.json()

  return data?.docs
}
