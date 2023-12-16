import { Button } from 'payload/components'
import { Label, useField, useFormFields } from 'payload/components/forms'

type Props = {
  path: string
  label?: Record<string, string> | false | string
  required?: boolean
}

const CustomSlugField = ({ path, label, required }: Props) => {
  const formatTitle = (val: any): string => {
    if (!val) return ''
    return val
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase()
  }

  const title = useFormFields(([fields]) => fields.title)

  const formattedTitle = title?.value ? formatTitle(title.value) : ''
  const { value, setValue } = useField<string | undefined>({ path })

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
