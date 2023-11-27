import qs from 'qs'

import { getPayloadClient } from '@/getPayload'
import type { RecordType } from '@/types'

// export const getAllRecords = async (limit = 100): Promise<RecordType[]> => {
//   const req = await fetch(`${process.env.PAYLOAD_CMS_URL}?limit=${limit}?where[isRecordShow]=true`)
//   const data = await req.json()

//   return data?.docs
// }

// export const getRecords = async (limit = 100): Promise<RecordType[]> => {
//   const payload = await getPayloadClient()

//   const getPosts = async () => {
//     const record = await payload.find({
//       collection: 'records',
//       where: {
//         isRecordShow: {
//           equals: false,
//         },
//       },
//     })

//     return record
//   }

//   const daa = await getPosts()

//   return daa?.docs
// }

export const getAllRecords = async (limit = 100): Promise<RecordType[]> => {
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
