import { SlateToReact } from '@/lib/slateToReact'

export default function SerializeSlateNew({ value }: { value: unknown }) {
  return (
    <div className='prose max-w-full text-primary prose-headings:text-primary prose-a:text-primary prose-strong:text-primary'>
      <SlateToReact nodes={value as any} />
    </div>
  )
}
