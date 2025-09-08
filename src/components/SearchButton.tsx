import { SearchIcon } from './Icons'

import { cn } from '@/lib/utils'

type Props = {
  onButtonClick: (open: boolean) => void
  className?: string
}

const SearchButton = ({ onButtonClick, className }: Props): JSX.Element => {
  return (
    <div className='group relative md:block'>
      <div className='search-button-bg absolute -inset-0.5 -z-10 rounded-lg opacity-60 blur transition group-hover:blur-md' />
      <button
        type='button'
        className={cn(
          'flex h-9 items-center justify-between rounded-sm bg-input px-4 ring-1 ring-muted/50',
          'search-button-bg animate-button-gradient bg-[length:200%_200%]',
          'transition-shadow',
          className,
        )}
        onClick={() => onButtonClick(true)}
      >
        <div className='flex items-center text-primary/70'>
          <SearchIcon className='mr-2' />
          <span className='text-sm'>Open the door</span>
        </div>
        <kbd className='flex items-center gap-1 text-primary/70'>
          <abbr className='text-lg no-underline'>⌘</abbr>
          <span className='text-sm'>K</span>
        </kbd>
      </button>
    </div>
  )
}

export default SearchButton
