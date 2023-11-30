import { PsychedelicDBIcon } from '../Icons'

const NoResultsFallback = (): JSX.Element => {
  return (
    <div className='flex items-center justify-center relative'>
      <PsychedelicDBIcon className='absolute w-64 h-64 text-muted-foreground/10' />
      <p className='text-muted-foreground'>Try searching for something cool</p>
    </div>
  )
}

export default NoResultsFallback
