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
        'group flex-1 rounded px-4 py-4 transition-colors hover:bg-secondary/55',
      )}
    >
      <div className='flex flex-wrap gap-1'>
        {substance.map((sub) => (
          <SubstanceBadge
            key={sub}
            substance={sub}
            className='bg-secondary text-primary hover:bg-secondary'
          />
        ))}
      </div>
      <h3 className='my-3 font-semibold text-primary transition-opacity group-hover:opacity-70'>
        {title}
      </h3>
      <time className='text-sm text-primary/70 transition-opacity group-hover:opacity-70'>
        {dayjs(publishedAt).format('YYYY MMM')}
      </time>
    </Link>
  )
}

const RecommandSection = ({ recommendPapers }: RecommandSectionProps) => {
  return (
    <div className='mt-8 px-1 md:mt-12'>
      <h2 className='mb-2 pl-2 text-lg font-semibold md:mb-3'>
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
