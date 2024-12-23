import { TheEye } from '@/components/Icons'
import SplineComponent from '@/components/SplineComponent'

const Home = async (): Promise<JSX.Element> => {
  return (
    <>
      <main className='flex flex-1 flex-col px-3'>
        <div className='container relative flex flex-1 flex-col items-center justify-start'>
          <div className='absolute bottom-6 left-6 flex flex-col md:bottom-20 md:left-10'>
            <div className='relative inline h-12 md:h-20'>
              <TheEye className='absolute top-0 w-12 text-primary/80 md:w-20' />
              <TheEye className='absolute top-3 w-12 text-primary/65 md:top-5 md:w-20' />
              <TheEye className='absolute top-6 w-12 text-primary/20 md:top-10 md:w-20' />
            </div>
            <h1 className='mb-3 text-4xl font-semibold sm:mb-6 sm:text-6xl'>
              <span>
                The Doors <br /> of Perception
              </span>
            </h1>
            <p className='max-w-80 text-muted-foreground sm:text-xl'>
              Welcome to Psychedelics Database, a comprehensive resource for all
              things about psychedelics.
            </p>
          </div>
          <div className='fixed bottom-8 left-0 -z-10 h-full w-full'>
            <SplineComponent />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
