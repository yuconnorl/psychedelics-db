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
    <div className='pointer-events-none absolute flex flex-col items-center opacity-20'>
      <Formula className='opacity-[0.4]' />
      <span className='font-sm sm:font-base mt-2 select-none font-garamond font-semibold sm:mt-4'>
        {description}
      </span>
    </div>
  )
}

const NoResultsFallback = (): JSX.Element => {
  const { indexUiState, status, results } = useInstantSearch()

  return (
    <div className='relative flex items-center justify-center px-2'>
      {indexUiState.query &&
        status !== 'loading' &&
        status !== 'stalled' &&
        !results.__isArtificial &&
        results.nbHits === 0 && (
          <div className='pointer-events-none max-w-xs text-center text-muted-foreground'>
            You are more than welcome to contribute the entry for
            <span className='mx-1.5 font-medium text-primary'>
              "{indexUiState.query}"
            </span>
            to our database
          </div>
        )}
      {status === 'loading' ||
        (status === 'stalled' && (
          <div className='pointer-events-none max-w-xs text-center text-muted-foreground'>
            Searching...
          </div>
        ))}
      <RandomSubstance />
    </div>
  )
}

export default NoResultsFallback
