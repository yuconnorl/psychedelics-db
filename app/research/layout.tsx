import Footer from '@/components/Footer'
import { ChildrenProps } from '@/types'

const ResearchLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className='flex flex-col justify-between flex-1'>
      <main className='container pb-4 px-4 md:py-4 md:px-6 flex-1 items-start'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default ResearchLayout
