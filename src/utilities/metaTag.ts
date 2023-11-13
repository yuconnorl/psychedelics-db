import { parse } from 'node-html-parser'

// ref: https://ikartik.com/code/link-previews

export const resolveMetaTag = async url => {
  const response = await fetch(url)
  const body = await response.text()

  const rootElement = await parse(body)
  const headLink = rootElement.getElementsByTagName('head')[0].getElementsByTagName('link')
  const metaTags = rootElement.getElementsByTagName('meta')

  // TODO: resolve relative path
  const iconUrl = headLink
    .filter(
      meta =>
        meta.attributes?.rel?.toLowerCase() === 'icon' ||
        meta.attributes?.rel?.toLowerCase().includes('icon'),
    )
    .map(meta => meta.attributes)[0]

  const imgUrl = metaTags
    .filter(
      meta =>
        meta.attributes?.name?.toLowerCase() === 'twitter:image' ||
        meta.attributes?.property?.toLowerCase() === 'og:image',
    )
    .map(meta => meta.attributes.content)[0]

  // title
  const titleAttrs = ['og:site_name', 'og:title', 'twitter:title']
  const directTitle = rootElement.getElementsByTagName('title')[0].textContent
  const titleTag = metaTags.find(
    meta =>
      titleAttrs.includes(meta.attributes?.name?.toLowerCase()) ||
      titleAttrs.includes(meta.attributes?.property?.toLowerCase()),
  )

  const title = titleTag ? titleTag.attributes.content : directTitle

  // description
  const descriptionAttrs = ['description', 'og:description']
  const description = metaTags.find(
    meta =>
      descriptionAttrs.includes(meta.attributes?.name?.toLowerCase()) ||
      descriptionAttrs.includes(meta.attributes?.property?.toLowerCase()),
  )?.attributes.content

  return { href: url, title: title, imgUrl, description }
}
