import { SearchIcon } from './Icons'

import { cn } from '@/lib/utils'

type Props = {
  onButtonClick: (open: boolean) => void
  className?: string
}

const SearchButton = ({ onButtonClick, className }: Props): JSX.Element => {
  return (
    <button
      type='button'
      className={cn(
        'flex items-center ring-1 ring-muted bg-input px-4 h-10 rounded-md justify-between hover:bg-muted-foreground/30 transition-colors',
        className,
      )}
      onClick={() => onButtonClick(true)}
    >
      <div className='flex items-center'>
        <SearchIcon className='text-muted-foreground mr-2' />
        <div className='text-sm text-muted-foreground'>Open the door...</div>
      </div>
      <kbd className='flex items-center gap-1 text-foreground/70'>
        <abbr className='no-underline text-lg'>⌘</abbr>
        <span className='text-sm'>K</span>
      </kbd>
    </button>
  )
}

export default SearchButton
