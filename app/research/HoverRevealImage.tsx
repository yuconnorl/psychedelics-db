'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

import imgHomerTrippy from '@/assets/homer-trippy.webp'
import imgTrippyDrawing from '@/assets/trippy-drawing.webp'

const HoverRevealImage = (): JSX.Element => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const parentRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event): void => {
    const boundingRect = parentRef.current.getBoundingClientRect()

    const x = event.clientX - boundingRect.left
    const y = event.clientY - boundingRect.top
    setPosition({ x: x, y: y })
  }

  return (
    <div className='group inline'>
      <div
        onMouseMove={handleMouseMove}
        ref={parentRef}
        className='relative inline'
      >
        <span className='italic font-garamond'>Psychedelics</span>
        <Image
          src={imgHomerTrippy}
          alt='Homer on trip'
          className='absolute left-4 top-4 w-36 ml-4 invisible inline group-hover:visible'
          quality={75}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        />
      </div>
      <Image
        src={imgTrippyDrawing}
        alt='Trippy drawing'
        className='absolute right-0 top-0 w-52 ml-4 invisible inline group-hover:visible'
        quality={75}
      />
    </div>
  )
}

export default HoverRevealImage
