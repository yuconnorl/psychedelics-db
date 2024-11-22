import { getPapers } from '@/api/general'
import PapersTable from '@/components/PapersTable'
import SubstancesButtonGroup from '@/components/SubstancesButtonGroup'

const PaperSection = async (): Promise<JSX.Element> => {
  const papers = await getPapers()

  return (
    <section className='grid gap-3 md:px-6 md:grid-cols-[minmax(12rem,_0.3fr)_1fr] relative'>
      <SubstancesButtonGroup />
      <PapersTable papers={papers} />
    </section>
  )
}

export default PaperSection
