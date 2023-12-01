'use client'

import Image from 'next/image'

const substancesMap = {
  lsd: 'Lysergic acid diethylamide, LSD',
  psilocybin: 'Psilocybin',
  mescaline: '3,4,5-trimethoxyphenethylamine, Mescaline',
  dmt: 'N,N-Dimethyltryptamine, DMT',
  mdma: '3,4-Methyl​enedioxy​methamphetamine, MDMA',
}

const RandomSubstance = () => {
  const substances = Object.keys(substancesMap)
  const randomSubstance =
    substances[Math.floor(Math.random() * substances.length)]

  return (
    <div className='absolute opacity-10 flex flex-col items-center pointer-events-none'>
      <Image
        src={`/substances-formula/${randomSubstance}.svg`}
        alt={randomSubstance}
        width={250}
        height={100}
      />
      <div className='mt-4 font-garamond'>{substancesMap[randomSubstance]}</div>
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
