import Footer from '@/components/Footer'
import { ChildrenProps } from '@/types'

const ResearchLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className='flex flex-col justify-between flex-1'>
      <main className='container md:py-4 px-6'>{children}</main>
      <Footer />
    </div>
  )
}

export default ResearchLayout
