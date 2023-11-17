import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type TooltipButtonProps = {
  content: string
  children: React.ReactNode
}

const TooltipButton = ({ children, content }: TooltipButtonProps): JSX.Element => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipButton
