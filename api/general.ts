import { getPayloadClient } from '@payload/payloadClient'

import { RecordType } from '@types'

export const getAllRecords = async (limit = 500): Promise<RecordType[]> => {
  const payload = await getPayloadClient()

  try {
    const records = await payload.find({
      collection: 'records',
      where: {
        isRecordShow: {
          equals: true,
        },
      },
      limit,
    })

    return records?.docs
  } catch (error: unknown) {
    console.error('An error occurred:', error)
    return []
  }
}
