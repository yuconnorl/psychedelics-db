'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import SidebarItem from './SidebarItem'

import { Accordion } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { CategoryOptionsType } from '@/types'

const SidebarAccordion = ({ recordsMapZh, recordsMapEn }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState([])

  const getCategoryName = () => {
    const path = pathname.split('/')
    if (path[1] !== 'database') return ''
    if (path[1] === 'database' && path.length >= 2) return path[2]
  }

  const categoryName = getCategoryName()
  return (
    <Accordion
      className='relative overflow-hidden h-full py-6 lg:pl-4 pr-4 lg:py-8 flex flex-col gap-3 xl:gap-4'
      type='multiple'
      defaultValue={[categoryName]}
      value={open}
      onValueChange={setOpen}
    >
      {Object.keys(recordsMapZh).map((category: CategoryOptionsType) => (
        <SidebarItem
          key={category}
          category={category}
          records={recordsMapZh[category]}
          onCategoryClicked={setOpen}
          currentState={open}
        />
      ))}
      <Separator className='my-4 w-[90%] self-center' />
      {Object.keys(recordsMapEn).map((category: CategoryOptionsType) => (
        <SidebarItem
          key={category}
          category={category}
          records={recordsMapEn[category]}
          onCategoryClicked={setOpen}
          currentState={open}
        />
      ))}
    </Accordion>
  )
}

export default SidebarAccordion
