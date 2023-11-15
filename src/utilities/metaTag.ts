import { parse } from 'node-html-parser'

// ref: https://ikartik.com/code/link-previews
export const resolveMetaTag = async (url, slug) => {
  const response = await fetch(url, { next: { tags: [`${slug}`] } })
  const body = await response.text()

  const rootElement = await parse(body)
  const headLink = rootElement.getElementsByTagName('head')[0].getElementsByTagName('link')
  const metaTags = rootElement.getElementsByTagName('meta')

  const resolveUrl = (baseUrl: string, targetUrl: string) => {
    if (!targetUrl.startsWith('http') && !targetUrl.startsWith('https')) {
      return `${baseUrl}${targetUrl}`
    }
    return targetUrl
  }

  // icon
  const iconAttrs = ['shortcut icon', 'icon']
  const iconTag = headLink.find((meta) => iconAttrs.includes(meta.attributes?.rel?.toLowerCase()))

  const iconUrl = iconTag ? resolveUrl(url, iconTag.attributes.href) : '/psyche-icon.png'

  // og image
  const imageAttrs = ['og:image', 'twitter:image']
  const imageTag = metaTags.find(
    (meta) => imageAttrs.includes(meta.attributes?.property?.toLowerCase()),
    // imageAttrs.includes(meta.attributes?.name?.toLowerCase()),
  )

  const imgUrl = imageTag ? resolveUrl(url, imageTag?.attributes.content) : '/psyche-icon.png'

  // title
  const titleAttrs = ['og:site_name', 'og:title', 'twitter:title']
  const directTitle = rootElement.getElementsByTagName('title')[0].textContent
  const titleTag = metaTags.find(
    (meta) =>
      titleAttrs.includes(meta.attributes?.property?.toLowerCase()) ||
      titleAttrs.includes(meta.attributes?.name?.toLowerCase()),
  )

  const title = titleTag ? titleTag.attributes.content : directTitle

  // description
  const descriptionAttrs = ['description', 'og:description']
  const description = metaTags.find(
    (meta) =>
      descriptionAttrs.includes(meta.attributes?.name?.toLowerCase()) ||
      descriptionAttrs.includes(meta.attributes?.property?.toLowerCase()),
  )?.attributes.content

  return { href: url, title: title, imgUrl, description, iconUrl }
}
