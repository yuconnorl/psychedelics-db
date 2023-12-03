'use client'

import { useMemo } from 'react'

import {
  Dmt,
  Lsd,
  Mdma,
  Mescaline,
  Psilocybin,
} from '@/components/SubstancesSvg'

const RandomSubstance = () => {
  const subArr = [
    {
      name: 'LSD',
      description: 'Lysergic acid diethylamide, LSD',
      formula: Lsd,
    },
    {
      name: 'Psilocybin',
      description: 'Psilocybin',
      formula: Psilocybin,
    },
    {
      name: 'Mescaline',
      description: '3,4,5-trimethoxyphenethylamine, Mescaline',
      formula: Mescaline,
    },
    {
      name: 'DMT',
      description: 'N,N-Dimethyltryptamine, DMT',
      formula: Dmt,
    },
    {
      name: 'MDMA',
      description: '3,4-Methyl​enedioxy​methamphetamine, MDMA',
      formula: Mdma,
    },
  ]

  const randomSubstance = useMemo(
    () => subArr[Math.floor(Math.random() * subArr.length)],
    [],
  )

  const Formula = randomSubstance.formula
  const description = randomSubstance.description

  return (
    <div className='absolute opacity-10 flex flex-col items-center pointer-events-none'>
      <Formula />
      <span className='mt-4 font-bold font-garamond'>{description}</span>
    </div>
  )
}

const NoResultsFallback = (): JSX.Element => {
  return (
    <div className='flex items-center justify-center relative'>
      <RandomSubstance />
      <p className='text-muted-foreground pointer-events-none'>
        Try searching for something cool
      </p>
    </div>
  )
}

export default NoResultsFallback
