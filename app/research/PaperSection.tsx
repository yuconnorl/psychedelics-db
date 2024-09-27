import dayjs from 'dayjs'
import Link from 'next/link'

import { getPapers } from '@/api/general'
import PapersTable from '@/components/PapersTable'
import SubstancesButtonGroup from '@/components/SubstancesButtonGroup'

const PaperSection = async (): Promise<JSX.Element> => {
  const papers = await getPapers()

  return (
    <div className='grid gap-3 md:grid-cols-[minmax(12rem,_0.3fr)_1fr] relative'>
      <SubstancesButtonGroup />
      <div className='flex flex-col gap-5'>
        <PapersTable papers={papers} />
      </div>
    </div>
  )
}

export default PaperSection
