import Sidebar from '@/components/Sidebar'

export async function getRecords() {
  const req = await fetch('{cms-url}/api/{collection-slug}')
  const data = await req.json()

  return data
}

const DatabasePage = async () => {
  const req = await fetch('http://localhost:3000/api/records?limit=100')
  const data = await req.json()

  return (
    <div className="flex">
      <Sidebar />
      <div>db</div>
    </div>
  )
}

export default DatabasePage
