import Footer from '@/components/Footer'
import { ChildrenProps } from '@/types'

const ResearchLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className='flex flex-1 flex-col justify-between'>
      <main className='container flex-1 items-start px-4 pb-4 md:px-6 md:py-4'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default ResearchLayout
