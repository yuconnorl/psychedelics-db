'use client'

import { useEffect, useMemo, useRef } from 'react'
import { babyPacifier, cactus, flowerLotus, frogFace } from '@lucide/lab'
import {
  createLucideIcon,
  Leaf,
  Mailbox,
  MessageCircleHeart,
  Soup,
  Wheat,
} from 'lucide-react'
import Image from 'next/image'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import imgURSociopath from '../assets/u-r-sociopath.gif'

import imgPsyBg1 from '@/assets/psy-bg-1.webp'
import imgPsyBg2 from '@/assets/psy-bg-2.webp'
import imgPsyBg3 from '@/assets/psy-bg-3.webp'
import { CannabisIcon, DeselectAllIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import VectorSearch from '@/components/VectorSearch'
import { substanceOptions } from '@/config/options'
import { cn } from '@/lib/utils'

const SubstancesButtonGroup = (): JSX.Element => {
  const fiveEyesRef = useRef(null)
  const [querySubstance, setQuerySubstance] = useQueryState(
    'substance',
    parseAsArrayOf(parseAsString),
  )

  const FrogFace = createLucideIcon('frogFace', frogFace)
  const FlowerLotus = createLucideIcon('flowerLotus', flowerLotus)
  const Cactus = createLucideIcon('cactus', cactus)
  const BabyPacifier = createLucideIcon('babyPacifier', babyPacifier)

  const substancesIconMap = {
    lsd: <Mailbox size={16} strokeWidth={1.5} />,
    '5-meo-dmt': <FrogFace size={16} strokeWidth={1.5} />,
    cannabis: <CannabisIcon />,
    mdma: <MessageCircleHeart size={16} strokeWidth={1.5} />,
    ayahuasca: <Soup size={16} strokeWidth={1.5} />,
    peyote: <FlowerLotus size={16} strokeWidth={1.5} />,
    mescaline: <Cactus size={16} strokeWidth={1.5} />,
    ibogaine: <Leaf size={16} strokeWidth={1.5} />,
    'lsd-analogs': <Wheat size={16} strokeWidth={1.5} />,
    lsa: <BabyPacifier size={16} strokeWidth={1.5} />,
  }

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

  type StaticImageData = {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }

  const getImageForSubstance = (
    substance: string,
  ): string | StaticImageData => {
    for (const [group, substances] of Object.entries(substancesGroupMap)) {
      if (substances.includes(substance)) {
        return groupToImgMap[group]
      } else {
        return imgPsyBg1
      }
    }
  }

  const randomThreshold = useMemo(() => Math.floor(Math.random() * 3) + 1, [])

  const isSociopathShow = useMemo(
    () => querySubstance?.length > randomThreshold,
    [querySubstance, randomThreshold],
  )

  const onDeselectAllClick = (): void => {
    setQuerySubstance([], { shallow: true })
  }

  const onSubstanceBadgeClick = (substance: string): void => {
    setQuerySubstance(
      (prev) => {
        if (prev === null) {
          return [substance]
        } else if (prev.includes(substance)) {
          return prev.filter((item) => item !== substance)
        } else {
          return [...prev, substance]
        }
      },
      { shallow: true },
    )
  }

  const handleScrollToSection = () => {
    // Get the position of the target div
    const targetPosition = fiveEyesRef.current?.getBoundingClientRect().top

    // Get the current scroll position
    const startPosition = window.scrollY

    // Calculate the scroll distance
    const distance = targetPosition + startPosition + 200

    // Custom smooth scroll function
    const smoothScroll = () => {
      window.scrollTo({
        top: distance,
        behavior: 'smooth',
      })
    }

    if (distance === window.scrollY) return

    smoothScroll()
  }

  useEffect(() => {
    const fiveEyes = document.getElementById('five-eyes-image-section')
    fiveEyesRef.current = fiveEyes
  }, [])

  return (
    <div className='md:top-24 md:sticky h-max md:pr-4'>
      <h3 className='mb-4 pl-2 font-semibold'>Categories</h3>
      <VectorSearch />
      <div className='flex gap-2 flex-wrap items-start'>
        {Object.entries(substanceOptions).map(([value, substanceName]) => {
          const isActive = querySubstance?.includes(value)
          const imgUrl = getImageForSubstance(value)

          return (
            <div
              className='relative group h-fit'
              onClick={handleScrollToSection}
              key={value}
            >
              <button
                className={cn(
                  isActive && '-translate-x-2 -translate-y-2 border-foreground',
                  'relative rounded-md border bg-card text-card-foreground shadow-sm break-inside active:translate-y-1 active:translate-x-1 transition-all will-change-transform z-20',
                )}
                onClick={(): void => onSubstanceBadgeClick(value)}
              >
                <div className='flex px-3 md:px-4 py-1.5 gap-1 items-center group-hover:opacity-50'>
                  <span className='text-primary/80'>
                    {substancesIconMap[value]}
                  </span>
                  <span className='font-normal text-sm z-10 group-hover:opacity-50 transition-opacity'>
                    {substanceName}
                  </span>
                </div>
              </button>
              <div className='absolute bg-foreground w-[calc(100%-5px)] h-[calc(100%-5px)] top-1 left-1 rounded-lg -z-10'>
                <div className='relative w-full h-full overflow-hidden rounded-lg border border-foreground'>
                  <Image
                    src={imgUrl}
                    alt='Psychedelic-ish background'
                    className='w-full left-0 top-0 opacity-75'
                    unoptimized
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
          <DeselectAllIcon className='mr-1 size-4' />
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
