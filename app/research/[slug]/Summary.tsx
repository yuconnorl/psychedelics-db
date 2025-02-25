'use client'

import { useState } from 'react'

import { KeyIcon } from '@/components/Icons'
import { Switch } from '@/components/ui/switch'

const Summary = ({ summary, summaryZhTw }) => {
  const [isZhTw, setIsZhTw] = useState(summaryZhTw?.length > 0)
  const formattedSummary = isZhTw ? summaryZhTw : summary
  const isSwitchDisabled = summaryZhTw?.length === 0

  return (
    <>
      {formattedSummary?.length > 0 && (
        <section className='relative mb-5 flex flex-col rounded-sm bg-primary-foreground p-4 pb-4 md:p-5'>
          <div className='flex justify-between'>
            <h3 className='mb-4 flex items-center font-medium'>
              <KeyIcon className='mr-2 inline' />
              Key Findings
            </h3>
            <div className='flex items-center gap-1.5'>
              <span className='text-sm text-primary/70'>En</span>
              <Switch
                disabled={isSwitchDisabled}
                checked={isZhTw}
                onCheckedChange={(checked) => setIsZhTw(checked)}
              />
              <span className='text-sm text-primary/70'>Tw</span>
            </div>
          </div>
          <ul className='prose ml-2 flex flex-col pl-2 text-primary md:ml-3'>
            {formattedSummary?.map(({ id, summary }) => (
              <li
                className='before:contents-[""] relative before:absolute before:-left-[0.8rem] before:top-[0.75rem] before:h-[0.3rem] before:w-[0.3rem] before:rounded-full before:bg-primary/60 md:pl-1'
                key={id}
              >
                {summary}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default Summary
