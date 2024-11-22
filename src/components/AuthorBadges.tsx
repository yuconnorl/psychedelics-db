'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { UserCircleIcon } from '@/components/Icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type AuthorBadgesProps = {
  authors: string[]
}

type AuthorBadgeProps = {
  author: string
  index: number
  isAuthorsExpanded: boolean
}

const maxAuthors = 6

const AuthorBadge = ({
  author,
  index,
  isAuthorsExpanded,
}: AuthorBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar
            className={cn(
              'h-7 w-7 mr-2',
              index < maxAuthors || isAuthorsExpanded
                ? 'inline-flex'
                : 'hidden',
            )}
          >
            <AvatarFallback className='text-xs'>
              {author.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <div className='flex items-center'>
            <UserCircleIcon className='inline mr-1 size-4' />
            <span className='pr-0.5'>{author}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const AuthorBadges = ({ authors }: AuthorBadgesProps) => {
  const [isAuthorsExpanded, setIsAuthorsExpanded] = useState(false)

  const handleAuthorsExpanded = () => {
    setIsAuthorsExpanded(!isAuthorsExpanded)
  }

  return (
    <div className='flex flex-wrap'>
      {authors.map((author, index) => (
        <AuthorBadge
          isAuthorsExpanded={isAuthorsExpanded}
          key={uuidv4()}
          author={author}
          index={index}
        />
      ))}
      {authors.length > maxAuthors && (
        <Avatar
          onClick={(e) => {
            e.preventDefault()
            handleAuthorsExpanded()
          }}
          className={cn(
            'h-7 w-7 cursor-pointer',
            isAuthorsExpanded && ' hidden',
          )}
        >
          <AvatarFallback className='text-xs'>
            +{authors.length - maxAuthors}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export default AuthorBadges
