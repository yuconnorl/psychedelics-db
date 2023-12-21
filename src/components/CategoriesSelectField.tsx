import * as React from 'react'
import { SelectInput, useField } from 'payload/components/forms'

import { getCategories } from '../api/general'

type CustomSelectProps = {
  path: string
  required: boolean
}

const CategoriesSelectField: React.FC<CustomSelectProps> = ({
  path,
  required,
}) => {
  const { value, setValue } = useField<string>({ path })
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      const transformedCategories = categories
        .map((category) => {
          return { label: category.displayName, value: category.value }
        })
        .sort((a, b) => a.label.localeCompare(b.label))

      setOptions(transformedCategories)
    }

    try {
      fetchCategories()
    } catch (error: unknown) {
      console.log(`fetch categories error: ${error}`)
    }
  }, [])

  return (
    <div>
      <label className='field-label'>
        Category
        {required && <span className='required'>*</span>}
      </label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  )
}

export default CategoriesSelectField
