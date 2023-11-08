import React, { forwardRef, Ref } from 'react'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props

  return <div ref={ref}>{children}</div>
})

Gutter.displayName = 'Gutter'
