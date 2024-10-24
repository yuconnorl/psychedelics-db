import pdf from 'pdf-parse'
import qs from 'qs'

import { getPayloadClient } from '../getPayload'

import { IS_DEV } from '@/config/general'
import type { PaperData, PaperType, RecordType } from '@/types'

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

// export const getCategories = async (limit = 500) => {
//   const payload = await getPayloadClient()

//   try {
//     const records = await payload.find({
//       collection: 'categories',
//       limit,
//     })

//     return records?.docs
//   } catch (error: unknown) {
//     console.error('An error occurred:', error)
//     return []
//   }
// }

export const getCategories = async (limit = 300) => {
  try {
    const fetchUrl = `http://localhost:3000/api/categories?limit=${limit}`

    const response = await fetch(fetchUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data?.docs
  } catch (error: unknown) {
    console.error('Fetch categories error:', error)
    return []
  }
}

export const getTypes = async (limit = 300) => {
  try {
    const fetchUrl = `http://localhost:3000/api/types?limit=${limit}`

    const response = await fetch(fetchUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data?.docs
  } catch (error: unknown) {
    console.error('Fetch types error:', error)
    return []
  }
}

export const getPapers = async (limit = 300): Promise<PaperData[] | []> => {
  try {
    const fetchUrl = `http://localhost:3000/api/papers?limit=${limit}`

    const response = await fetch(fetchUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: { docs: PaperType[] } = await response.json()

    const papers: PaperData[] = data?.docs.map((paper) => {
      return {
        id: paper.id,
        slug: paper.slug,
        title: paper.title,
        authors: paper.authorsField.map((author) => author.author),
        journal: paper.journal,
        abstract: paper.abstract,
        keywords: paper.keywordsField.map((keyword) => keyword.keyword),
        doi: paper.doi,
        url: paper.url,
        substance: paper.substance,
        publishedAt: paper.publishedAt,
        viewCount: paper.viewCount,
        summary: paper.summaryField,
      }
    })
    return papers
  } catch (error: unknown) {
    console.error('Fetch papers error:', error)
    return []
  }
}

// export const getPdf = async () => {
//   const response = await fetch(
//     'https://sci-hub.se/10.1016/j.drugalcdep.2006.04.001',
//   )
//   const arrayBuffer = await response.arrayBuffer()
//   const buffer = Buffer.from(arrayBuffer)

//   const data = await pdf(buffer)

//   console.log('data', data)
//   console.log('data text-------', data.text)

//   return data.text
// }
