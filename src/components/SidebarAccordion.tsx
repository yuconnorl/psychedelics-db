'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { CollaspeIcon } from './Icons'
import SidebarItem from './SidebarItem'

import { Accordion } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { CategoryOptionsType, RecordType } from '@/types'

type RecordMap = Record<CategoryOptionsType, RecordType[]>

type Props = {
  recordsMapZh: RecordMap
  recordsMapEn: RecordMap
  onCategoryClickedAndCloseSheet: () => void
}

const SidebarAccordion = ({
  recordsMapZh,
  recordsMapEn,
  onCategoryClickedAndCloseSheet,
}: Props): JSX.Element => {
  const [openedItems, setOpenedItems] = useState([])
  return (
    <Accordion
      className='relative overflow-hidden h-full py-6 lg:pl-4 pr-4 lg:py-8 flex flex-col gap-3 xl:gap-4'
      type='multiple'
      defaultValue={openedItems || ['']}
      value={openedItems}
      onValueChange={setOpenedItems}
    >
      <div
        role='button'
        className='text-muted-foreground hover:text-muted-foreground/50 mb-2 items-center transition-colors flex self-start'
        onClick={() => setOpenedItems([])}
      >
        <CollaspeIcon />
        <span className='text-xs ml-1'>Collapse all</span>
        <span className='sr-only'>Collapse all</span>
      </div>
      {Object.keys(recordsMapZh).map((category: CategoryOptionsType) => (
        <SidebarItem
          key={category}
          category={category}
          records={recordsMapZh[category]}
          onItemClicked={onCategoryClickedAndCloseSheet}
          onCategoryClicked={setOpenedItems}
          openedItems={openedItems}
        />
      ))}
      <Separator className='my-4 w-[90%] self-center' />
      {Object.keys(recordsMapEn).map((category: CategoryOptionsType) => (
        <SidebarItem
          key={category}
          category={category}
          records={recordsMapEn[category]}
          onItemClicked={onCategoryClickedAndCloseSheet}
          onCategoryClicked={setOpenedItems}
          openedItems={openedItems}
        />
      ))}
    </Accordion>
  )
}

export default SidebarAccordion
