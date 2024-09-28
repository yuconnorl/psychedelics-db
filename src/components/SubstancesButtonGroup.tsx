'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import imgURSociopath from '../assets/u-r-sociopath.gif'

import imgPsyBg1 from '@/assets/psy-bg-1.webp'
import imgPsyBg2 from '@/assets/psy-bg-2.webp'
import imgPsyBg3 from '@/assets/psy-bg-3.webp'
import { DeselectAllIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { substanceOptions } from '@/config/options'
import { cn } from '@/lib/utils'

const SubstancesButtonGroup = (): JSX.Element => {
  const [activeSubstance, setActiveSubstance] = useState([])
  const [querySubstance, setQuerySubstance] = useQueryState(
    'substance',
    parseAsArrayOf(parseAsString),
  )

  const substancesGroupMap = {
    group1: [
      '5-meo-dmt',
      'dmt',
      'lsd',
      'lsd-analogs',
      'mescaline',
      'peyote',
      'psilocybin',
      'ayahuasca',
    ],
    group2: ['mdma', 'ibogaine', 'ketamine', 'doi', 'lsa'],
    group3: [
      'pcp',
      'salvia',
      'ghb',
      'cannabis',
      'amanita-muscaria',
      'unspecified',
    ],
  }

  const groupToImgMap = {
    group1: imgPsyBg1,
    group2: imgPsyBg2,
    group3: imgPsyBg3,
  }

  const getImageForSubstance = (substance: string): string => {
    for (const [group, substances] of Object.entries(substancesGroupMap)) {
      if (substances.includes(substance)) {
        return groupToImgMap[group]
      }
    }
    return ''
  }

  const randomThreshold = useMemo(() => Math.floor(Math.random() * 3) + 1, [])

  const isSociopathShow = useMemo(
    () => activeSubstance.length > randomThreshold,
    [activeSubstance, randomThreshold],
  )

  const onDeselectAllClick = (): void => {
    setActiveSubstance([])
  }

  const onSubstanceClick = useCallback(
    (substanceName: string) => {
      if (activeSubstance.includes(substanceName)) {
        setActiveSubstance(
          activeSubstance.filter((name) => name !== substanceName),
        )
      } else {
        setActiveSubstance([...activeSubstance, substanceName])
      }
    },
    [activeSubstance, setActiveSubstance],
  )

  useEffect(() => {
    if (querySubstance) {
      setActiveSubstance(querySubstance)
    }
  }, [querySubstance])

  useEffect(() => {
    setQuerySubstance(activeSubstance)
  }, [activeSubstance, setQuerySubstance])

  return (
    <div className='md:top-24 md:sticky h-max md:pr-4'>
      <h3 className='mb-4 pl-2 font-semibold'>Substances</h3>
      <div className='flex gap-2 flex-wrap items-start'>
        {Object.entries(substanceOptions).map(([value, substanceName]) => {
          const isActive = activeSubstance.includes(value)
          const imgUrl = getImageForSubstance(value)

          return (
            <div className='relative group h-fit' key={value}>
              <button
                className={cn(
                  isActive && '-translate-x-2 -translate-y-2 border-foreground',
                  'relative rounded-lg border bg-card text-card-foreground shadow-sm break-inside active:translate-y-1 active:translate-x-1 transition-all will-change-transform z-20',
                )}
                onClick={(): void => onSubstanceClick(value)}
              >
                <div className='flex flex-col p-6 px-4 py-2 space-y-0'>
                  <h3 className='font-normal text-base z-10 group-hover:opacity-50 transition-opacity'>
                    {substanceName}
                  </h3>
                </div>
              </button>
              <div className='absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10'>
                <div className='relative w-full h-full overflow-hidden rounded-lg border border-foreground'>
                  <Image
                    src={imgUrl}
                    alt='Psychedelic-ish background'
                    className='w-full left-0 top-0 opacity-75'
                    quality={10}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Separator className='my-4 w-5/6' />
      <div className=''>
        <Button
          onClick={onDeselectAllClick}
          variant='outline'
          className='text-xs mb-2 md:mb-4'
        >
          <DeselectAllIcon className='mr-1' />
          Deselect
        </Button>
        <Image
          src={imgURSociopath}
          alt='Hoo. You are a sociopath.'
          className={cn('w-full md:w-5/6 hidden', isSociopathShow && 'block')}
          quality={50}
        />
      </div>
    </div>
  )
}

export default SubstancesButtonGroup
