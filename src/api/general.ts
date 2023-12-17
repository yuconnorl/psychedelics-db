import qs from 'qs'

import { getPayloadClient } from '../getPayload'

import { IS_DEV } from '@/config/general'
import type { RecordType } from '@/types'

export const getAllRecords = async (limit = 300): Promise<RecordType[]> => {
  try {
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
    // const fetchUrl = IS_DEV
    //   ? `http://localhost:3000/api/records${stringifiedQuery}&limit=${limit}`
    //   : ''

    const fetchUrl = `http://localhost:3000/api/records${stringifiedQuery}&limit=${limit}`

    const response = await fetch(fetchUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data?.docs
  } catch (error: unknown) {
    console.error('An error occurred:', error)
    return []
  }
}

// export const getAllRecords = async (limit = 500): Promise<RecordType[]> => {
//   const payload = await getPayloadClient()

//   try {
//     const records = await payload.find({
//       collection: 'records',
//       where: {
//         isRecordShow: {
//           equals: true,
//         },
//       },
//       limit,
//     })

//     return records?.docs
//   } catch (error: unknown) {
//     console.error('An error occurred:', error)
//     return []
//   }
// }
