import Footer from '@/components/Footer'
import { ChildrenProps } from '@/types'

const ResearchLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className='flex flex-col justify-between flex-1'>
      <div className='container'>
        <main className='py-6 mdp:pr-6'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default ResearchLayout
