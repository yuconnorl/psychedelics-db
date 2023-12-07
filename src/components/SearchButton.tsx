import { SearchIcon } from './Icons'

import { cn } from '@/lib/utils'

type Props = {
  onButtonClick: (open: boolean) => void
  className?: string
}

const SearchButton = ({ onButtonClick, className }: Props): JSX.Element => {
  return (
    <div className='hidden md:block relative group'>
      <div className='absolute search-button-bg -inset-0.5 rounded-lg blur group-hover:blur-md transition -z-10 opacity-60' />
      <button
        type='button'
        className={cn(
          'flex items-center ring-1 ring-muted/50 bg-input px-4 h-9 rounded-md justify-between',
          'search-button-bg bg-[length:200%_200%] animate-button-gradient',
          'transition-shadow',
          className,
        )}
        onClick={() => onButtonClick(true)}
      >
        <div className='flex items-center text-primary/70'>
          <SearchIcon className='mr-2' />
          <div className='text-sm'>Open the door...</div>
        </div>
        <kbd className='flex items-center gap-1 text-primary/70'>
          <abbr className='no-underline text-lg'>⌘</abbr>
          <span className='text-sm'>K</span>
        </kbd>
      </button>
    </div>
  )
}

export default SearchButton
