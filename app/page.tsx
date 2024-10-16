import SplineComponent from '@/components/SplineComponent'

const Home = async (): Promise<JSX.Element> => {
  return (
    <>
      <main className='flex flex-col flex-1 px-3'>
        <div className='container flex-1 flex justify-start items-center flex-col relative'>
          <div className='flex flex-col w-full absolute left-6 md:left-10 bottom-6 md:bottom-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl mb-3 sm:mb-6'>
              <span>
                The Doors <br /> of Perception
              </span>
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-80'>
              Welcome to Psychedelics Database, a comprehensive resource for all
              things about psychedelics.
            </p>
          </div>
          <div className='fixed w-full h-full -bottom-12 md:bottom-0 left-0 -z-10'>
            <SplineComponent />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
