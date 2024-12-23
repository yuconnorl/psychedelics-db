import type { MODEL_MAP } from '@/config/general'

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type ChildrenProps = {
  children: React.ReactNode
}

export type Models = keyof typeof MODEL_MAP
