import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { ChildrenProps } from '@/types'

const DatabaseLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className='flex flex-1 flex-col justify-between'>
      <div className='container flex-1 items-start px-6 pb-4 md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 md:py-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10'>
        <Sidebar />
        <main className='py-6 mdp:pr-6'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default DatabaseLayout
