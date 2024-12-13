import dayjs from 'dayjs'
import Link from 'next/link'

import SubstanceBadge from '@/components/SubstanceBadge'
import { cn } from '@/lib/utils'
import type { PaperData } from '@/types'

type RecommandSectionProps = {
  recommendPapers: PaperData[]
}

const RecommendCard = ({ paper }: { paper: PaperData }) => {
  const { slug, title, publishedAt, substance } = paper

  return (
    <Link
      href={`/research/${slug}`}
      prefetch={false}
      className={cn(
        'flex-1 px-4 py-4 group hover:bg-secondary/55 transition-colors rounded',
      )}
    >
      <div className='flex gap-1'>
        {substance.map((sub) => (
          <SubstanceBadge
            substance={sub}
            className='hover:bg-secondary bg-secondary text-primary'
          />
        ))}
      </div>
      <h3 className='group-hover:opacity-70 transition-opacity my-3 text-primary font-semibold'>
        {title}
      </h3>
      <time className='text-primary/70 text-sm group-hover:opacity-70 transition-opacity'>
        {dayjs(publishedAt).format('YYYY MMM')}
      </time>
    </Link>
  )
}

const RecommandSection = ({ recommendPapers }: RecommandSectionProps) => {
  return (
    <div className='mt-8 md:mt-12 px-1'>
      <h2 className='font-semibold text-lg mb-2 md:mb-3 pl-1'>
        Similar research
      </h2>
      <section className='flex flex-col md:flex-row md:divide-x'>
        {recommendPapers.map((paper) => (
          <RecommendCard key={paper.id} paper={paper} />
        ))}
      </section>
    </div>
  )
}

export default RecommandSection
