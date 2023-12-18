import { SlateToReact } from '@slate-serializers/react'

const SerializeSlate = ({ value }) => {
  return <SlateToReact node={value} />
}

export default SerializeSlate
