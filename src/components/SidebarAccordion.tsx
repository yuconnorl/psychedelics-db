'use client'

import { useEffect, useState } from 'react'
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
  categoriesMap: any
  onCategoryClickedAndCloseSheet?: () => void
}

const SidebarAccordion = ({
  recordsMapZh,
  recordsMapEn,
  categoriesMap,
  onCategoryClickedAndCloseSheet,
}: Props): JSX.Element => {
  const [openedItems, setOpenedItems] = useState(['psychedelics-fundamentals'])
  const pathname = usePathname()

  useEffect(() => {
    // when pathname changes, check if the current pathname is in the openedItems array
    // if it is not, add it to the openedItems array
    const currentCategory =
      pathname.split('/')[1] === 'database' &&
      pathname.split('/')[2] !== undefined
        ? pathname.split('/')[2]
        : ''

    if (!openedItems.includes(currentCategory) && currentCategory !== '') {
      setOpenedItems([...openedItems, currentCategory])
    }
  }, [pathname, openedItems])

  return (
    <Accordion
      className='relative flex h-full flex-col gap-3 overflow-hidden py-6 pr-4 lg:py-8 lg:pl-4 xl:gap-4'
      type='multiple'
      defaultValue={openedItems}
      value={openedItems}
      onValueChange={setOpenedItems}
    >
      <div
        role='button'
        className='mb-2 flex items-center self-start text-muted-foreground transition-colors hover:text-muted-foreground/50'
        onClick={() => setOpenedItems([])}
      >
        <CollaspeIcon />
        <span className='ml-1 text-xs'>Collapse all</span>
        <span className='sr-only'>Collapse all</span>
      </div>
      {Object.keys(recordsMapZh).map((category: CategoryOptionsType) => (
        <SidebarItem
          key={category}
          categoryTitle={categoriesMap[category]}
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
          categoryTitle={categoriesMap[category]}
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
