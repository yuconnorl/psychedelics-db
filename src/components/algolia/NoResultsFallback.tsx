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
    description: 'LSD',
    formula: Lsd,
  },
  {
    name: 'Psilocybin',
    description: 'Psilocybin',
    formula: Psilocybin,
  },
  {
    name: 'Mescaline',
    description: 'Mescaline',
    formula: Mescaline,
  },
  {
    name: 'DMT',
    description: 'DMT',
    formula: Dmt,
  },
  {
    name: 'MDMA',
    description: 'MDMA',
    formula: Mdma,
  },
]

const RandomSubstance = (): JSX.Element => {
  const randomSubstance = useMemo(
    () => subArr[Math.floor(Math.random() * subArr.length)],
    [],
  )

  const Formula = randomSubstance.formula
  const description = randomSubstance.description

  return (
    <div className='absolute opacity-10 flex flex-col items-center pointer-events-none'>
      <Formula className='opacity-[0.5]' />
      <span className='mt-2 sm:mt-4 font-semibold font-garamond font-sm sm:font-base'>
        {description}
      </span>
    </div>
  )
}

const NoResultsFallback = (): JSX.Element => {
  const { indexUiState, status } = useInstantSearch()

  return (
    <div className='flex items-center justify-center relative px-2'>
      {indexUiState.query && status !== 'loading' ? (
        <div className='text-muted-foreground pointer-events-none max-w-xs text-center'>
          You are more than welcome to contribute the entry for
          <span className='mx-1.5 text-primary font-medium'>
            "{indexUiState.query}"
          </span>
          to our database!
        </div>
      ) : (
        <>
          <RandomSubstance />
        </>
      )}
    </div>
  )
}

export default NoResultsFallback
