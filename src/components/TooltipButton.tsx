import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TooltipButton = ({ children, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipButton
