import * as React from 'react'
import { SelectInput, useField } from 'payload/components/forms'

import { getTypes } from '../api/general'

type CustomSelectProps = {
  path: string
  required: boolean
}

const TypesSelectField: React.FC<CustomSelectProps> = ({ path, required }) => {
  const { value, setValue } = useField<string>({ path })
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      const types = await getTypes()
      const transformedtypes = types
        .map((type) => {
          return { label: type.displayName, value: type.value }
        })
        .sort((a, b) => a.label.localeCompare(b.label))

      setOptions(transformedtypes)
    }
    try {
      fetchCategories()
    } catch (error: unknown) {
      console.log(`fetch types error: ${error}`)
    }
  }, [])

  return (
    <div>
      <label className='field-label'>
        Type
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

export default TypesSelectField
