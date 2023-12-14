/* eslint-disable no-console */
import pkg from '../../package.json'

import { IS_DEV } from '@configs/general'
import { SITE_NAME } from '@/constants/constants'

const versionLogger = (bgColor: string): void => {
  const version = IS_DEV
    ? 'development'
    : process.env.REACT_APP_VERSION || pkg.version

  console.log(
    `%c${SITE_NAME}%c${version}`,
    `background: ${bgColor}; color: #f5f8f1; padding: 2px 4px; border-radius: 3px 0 0 3px;`,
    'background: #1d1b1b; color: #f5f8f1; padding: 2px 4px; border-radius: 0 3px 3px 0;',
  )
}

export default versionLogger
