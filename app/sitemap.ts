import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { MetadataRoute } from 'next'

import { getAllRecords, getCategories, getPapers } from '@/api/general'
import { SITE_URL } from '@/constants/constants'

dayjs.extend(utc)

export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const papers = await getPapers()
  const records = await getAllRecords()
  const categories = await getCategories()
  const routes = ['database', 'research', 'about']

  const routesSiteMap = routes.map((route) => {
    return {
      url: `${SITE_URL}/${route}`,
      lastModified: dayjs().utc().format('YYYY-MM-DDTHH:mm:ssZ'),
    }
  })

  const categorySiteMap = categories.map((category) => {
    return {
      url: `${SITE_URL}/database/${category.value}`,
      lastModified: dayjs().utc().format('YYYY-MM-DDTHH:mm:ssZ'),
    }
  })

  const recordSiteMap = records.map((record) => {
    return {
      url: `${SITE_URL}/database/${record.category}/${record.slug}`,
      lastModified: dayjs(record.updatedAt)
        .utc()
        .format('YYYY-MM-DDTHH:mm:ssZ'),
    }
  })

  const paperSiteMap = papers.map((paper) => {
    return {
      url: `${SITE_URL}/research/${paper.slug}`,
      lastModified: dayjs(paper.updatedAt).utc().format('YYYY-MM-DDTHH:mm:ssZ'),
    }
  })

  return [
    {
      url: `${SITE_URL}`,
      lastModified: dayjs().utc().format('YYYY-MM-DDTHH:mm:ssZ'),
      priority: 1,
    },
    ...routesSiteMap,
    ...categorySiteMap,
    ...recordSiteMap,
    ...paperSiteMap,
  ]
}
