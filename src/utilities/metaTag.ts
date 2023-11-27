import { parse } from 'node-html-parser'

// ref: https://ikartik.com/code/link-previews
interface MetaInfo {
  href: string
  title: string
  imgUrl: string
  description: string
  iconUrl: string
}

export const resolveMetaTag = async (url: string, slug: string): Promise<MetaInfo> => {
  const response = await fetch(url, { next: { tags: [`${slug}`] } })
  const body = await response.text()
  const rootElement = await parse(body)

  const iconFallback = '/psyche-icon.png'
  const imageFallback = '/psyche-icon.png'

  const headLink = rootElement.getElementsByTagName('head')[0].getElementsByTagName('link')
  const metaTags = rootElement.getElementsByTagName('meta')

  let iconUrl = iconFallback
  let imgUrl = imageFallback
  let title: string

  // helper function to resolve relative urls to absolute urls
  const resolveUrl = (baseUrl: string, targetUrl: string): string => {
    if (!targetUrl.startsWith('http') && !targetUrl.startsWith('https')) {
      return `${baseUrl}${targetUrl}`
    }
    return targetUrl
  }

  // icon
  const iconAttrs = ['shortcut icon', 'apple-touch-icon', 'icon']
  for (const el of iconAttrs) {
    const iconTag = headLink.find((meta) => el === meta.attributes?.rel?.toLowerCase())

    if (iconTag) {
      iconUrl = resolveUrl(url, iconTag.attributes.href)
      break
    }
  }

  // og image
  const imageAttrs = ['og:image', 'twitter:image']
  for (const el of imageAttrs) {
    const imageTag =
      metaTags.find((meta) => el === meta.attributes?.property?.toLowerCase()) ||
      metaTags.find((meta) => el === meta.attributes?.name?.toLowerCase())

    if (imageTag) {
      if (el === 'og:image') imgUrl = resolveUrl(url, imageTag.attributes.content)
      if (el === 'twitter:image') imgUrl = resolveUrl(url, imageTag.attributes.href)
      break
    }
  }

  // title
  const titleAttrs = ['og:title', 'twitter:title', 'og:site_name']
  for (const el of titleAttrs) {
    const titleTag =
      metaTags.find((meta) => el === meta.attributes?.property?.toLowerCase()) ||
      metaTags.find((meta) => el === meta.attributes?.name?.toLowerCase())

    if (titleTag) {
      title = titleTag.attributes.content
      break
    }
  }

  if (!title) title = rootElement.querySelector('title')?.textContent

  // description
  const descriptionAttrs = ['description', 'og:description']
  const description = metaTags.find(
    (meta) =>
      descriptionAttrs.includes(meta.attributes?.name?.toLowerCase()) ||
      descriptionAttrs.includes(meta.attributes?.property?.toLowerCase()),
  )?.attributes.content

  return { href: url, title: title, imgUrl, description, iconUrl }
}
