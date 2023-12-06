/* eslint-disable import/named */
'use client'

import { useMemo } from 'react'
import { useInstantSearch } from 'react-instantsearch'

import {
  Dmt,
  Lsd,
  Mdma,
  Mescaline,
  Psilocybin,
} from '@/components/SubstancesSvg'

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

const RandomSubstance = () => {
  const randomSubstance = useMemo(
    () => subArr[Math.floor(Math.random() * subArr.length)],
    [],
  )

  const Formula = randomSubstance.formula
  const description = randomSubstance.description

  return (
    <div className='absolute opacity-10 flex flex-col items-center pointer-events-none'>
      <Formula />
      <span className='mt-2 sm:mt-4 font-semibold font-garamond'>
        {description}
      </span>
    </div>
  )
}

const NoResultsFallback = (): JSX.Element => {
  const { indexUiState, status } = useInstantSearch()

  return (
    <div className='flex items-center justify-center relative'>
      {indexUiState.query && status !== 'loading' ? (
        <div className='text-muted-foreground pointer-events-none'>
          <span className='mr-1 text-primary'>"{indexUiState.query}"</span>
          isn't the right key for the door
        </div>
      ) : (
        <>
          <RandomSubstance />
          <p className='text-muted-foreground pointer-events-none'>
            Try searching for something cool
          </p>
        </>
      )}
    </div>
  )
}

export default NoResultsFallback
