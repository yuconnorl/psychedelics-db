import Sidebar from '@/components/Sidebar'

const DatabaseLayout = ({ children }) => {
  return (
    <div className="container p-4 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <Sidebar />
      <main className="py-6">{children}</main>
    </div>
  )
}

export default DatabaseLayout
