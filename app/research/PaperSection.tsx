import { getPapers } from '@/api/general'
import PapersTable from '@/components/PapersTable'
import SubstancesButtonGroup from '@/components/SubstancesButtonGroup'

const PaperSection = async (): Promise<JSX.Element> => {
  const papers = await getPapers()

  return (
    <section className='grid gap-3 md:grid-cols-[minmax(12rem,_0.3fr)_1fr] relative'>
      <SubstancesButtonGroup />
      <div className='flex flex-col gap-5'>
        <PapersTable papers={papers} />
      </div>
    </section>
  )
}

export default PaperSection
