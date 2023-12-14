'use client'

import { useEffect } from 'react'

import versionLogger from '@utilities/versionLogger'

const VersionLogger = (): null => {
  useEffect(() => {
    versionLogger('#81a760')
  }, [])

  return null
}

export default VersionLogger
