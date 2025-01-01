'use client'
import { useEffect, useMemo, useRef } from 'react'
import {
  astronautHelmet,
  avocado,
  babyPacifier,
  cactus,
  flowerLotus,
  frogFace,
} from '@lucide/lab'
import {
  Atom,
  Blend,
  Brain,
  CircleDotDashed,
  createLucideIcon,
  Leaf,
  LeafyGreen,
  Mailbox,
  MessageCircleHeart,
  Snowflake,
  Soup,
  Wheat,
} from 'lucide-react'
import Image from 'next/image'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import imgURSociopath from '../assets/u-r-sociopath.gif'

import imgPsyBg1 from '@/assets/psy-bg-1.webp'
import imgPsyBg2 from '@/assets/psy-bg-2.webp'
import imgPsyBg3 from '@/assets/psy-bg-3.webp'
import {
  AmanitaIcon,
  CannabisIcon,
  DeselectAllIcon,
  MushroomIcon,
} from '@/components/Icons'
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
  const Avocado = createLucideIcon('avocado', avocado)
  const AstronautHelmet = createLucideIcon('astronautHelmet', astronautHelmet)

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
    psilocybin: <MushroomIcon />,
    'amanita-muscaria': <AmanitaIcon />,
    unspecified: <Brain size={16} strokeWidth={1.6} />,
    salvia: <LeafyGreen size={16} strokeWidth={1.5} />,
    dmt: <Atom size={16} strokeWidth={1.5} />,
    ketamine: <CircleDotDashed size={16} strokeWidth={1.8} />,
    pcp: <Snowflake size={16} strokeWidth={1.5} />,
    '2c-b': <Avocado size={16} strokeWidth={1.5} />,
    ghb: <AstronautHelmet size={16} strokeWidth={1.5} />,
    doi: <Blend size={16} strokeWidth={1.5} />,
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
    <div className='h-max md:sticky md:top-24 md:pr-4'>
      <h3 className='mb-4 pl-2 font-semibold'>Categories</h3>
      <VectorSearch />
      <div className='flex flex-wrap items-start gap-2'>
        {Object.entries(substanceOptions).map(([value, substanceName]) => {
          const isActive = querySubstance?.includes(value)
          const imgUrl = getImageForSubstance(value)

          return (
            <div
              className='group relative h-fit'
              onClick={handleScrollToSection}
              key={value}
            >
              <button
                className={cn(
                  isActive && '-translate-x-2 -translate-y-2 border-foreground',
                  'break-inside relative z-20 rounded-md border bg-card text-card-foreground shadow-sm transition-all will-change-transform active:translate-x-1 active:translate-y-1',
                )}
                onClick={(): void => onSubstanceBadgeClick(value)}
              >
                <div className='flex items-center gap-1 px-3 py-1.5 group-hover:opacity-50 md:px-4'>
                  <span className='text-primary/80'>
                    {substancesIconMap[value]}
                  </span>
                  <span className='z-10 text-xs font-normal transition-opacity group-hover:opacity-50'>
                    {substanceName}
                  </span>
                </div>
              </button>
              <div className='absolute left-1 top-1 -z-10 h-[calc(100%-5px)] w-[calc(100%-5px)] rounded-lg bg-foreground'>
                <div className='relative h-full w-full overflow-hidden rounded-lg border border-foreground'>
                  <Image
                    src={imgUrl}
                    alt='Psychedelic-ish background'
                    className='left-0 top-0 w-full opacity-75'
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
          className='mb-2 text-xs md:mb-4'
        >
          <DeselectAllIcon className='mr-1 size-4' />
          Deselect
        </Button>
        <Image
          src={imgURSociopath}
          alt='Hoo. You are a sociopath.'
          className={cn('hidden w-full md:w-5/6', isSociopathShow && 'block')}
          quality={50}
        />
      </div>
    </div>
  )
}

export default SubstancesButtonGroup
