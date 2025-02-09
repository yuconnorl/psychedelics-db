import React from 'react'
import { Button } from 'payload/components'
import { Label, useField, useFormFields } from 'payload/components/forms'

type Props = {
  path: string
  label?: Record<string, string> | false | string
  required?: boolean
}

const CustomSlugField = ({ path, label, required }: Props): JSX.Element => {
  const validateAndTransformSlug = (val: any): string => {
    if (!val) return ''

    const slug = val
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase()

    // Maximum length for slug (considering file system limitations)
    const MAX_SLUG_LENGTH = 200 // Safe length for most file systems

    // If slug is already shorter than max length, return it as is
    if (slug.length <= MAX_SLUG_LENGTH) return slug

    // Find the last hyphen position within the maxSlugLength
    const lastHyphenPos = slug.lastIndexOf('-', MAX_SLUG_LENGTH)

    // If no hyphen found, just trim at maxSlugLength
    // Otherwise trim at the last hyphen position
    return lastHyphenPos > 0
      ? slug.substring(0, lastHyphenPos)
      : slug.substring(0, MAX_SLUG_LENGTH)
  }

  const title = useFormFields(([fields]) => fields.title)

  const formattedTitle = title?.value
    ? validateAndTransformSlug(title.value)
    : ''
  const { value, setValue } = useField<string>({ path })

  const handleTitleCovert = (): void => {
    if (!title?.value) return
    setValue(formattedTitle)
  }

  return (
    <>
      <div className='field-type text'>
        <Label htmlFor={path} label={label} required={required} />
        <div className='field-type text'>
          <input
            type='text'
            id='field-slug'
            onChange={(e): void => setValue(e.target.value)}
            value={value}
          />
        </div>
      </div>
      <Button
        buttonStyle='secondary'
        iconStyle='with-border'
        size='small'
        onClick={handleTitleCovert}
      >
        Covert title to slug
      </Button>
    </>
  )
}
export default CustomSlugField
