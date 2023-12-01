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
        'flex items-center ring-1 ring-muted/50 bg-input px-4 h-9 rounded-md justify-between',
        'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/30 via-emerald-200/30 to-[#b65dee]/30 bg-[length:200%_200%] animate-button-gradient',
        'hover:ring-2 hover:ring-[#b65dee]/30 transition-shadow',
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
  )
}

export default SearchButton
