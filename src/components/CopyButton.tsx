'use client'

import { toast } from 'sonner'

import { CopyIcon } from '@/components/Icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type Props = { text: string; className?: string }

const CopyButton = ({ text, className = '' }: Props): JSX.Element => {
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(text)

    toast('Copied to clipboard')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={copyToClipboard}
            className={cn(
              'text-sm hover:opacity-50 transition-opacity ml-1 inline-flex',
              className,
            )}
          >
            <CopyIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CopyButton
