import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { ChildrenProps } from '@/types'

const DatabaseLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <>
      <div className="container py-4 px-6 flex-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <Sidebar />
        <main className="py-6 mdp:pr-6">{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default DatabaseLayout
