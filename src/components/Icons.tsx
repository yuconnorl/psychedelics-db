import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const StacksIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('w-6 h-6', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
      />
    </svg>
  )
}

export const SquaresIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('w-6 h-6', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
      />
    </svg>
  )
}

export const HamburgerIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('w-6 h-6 hover:opacity-40 transition-opacity', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
      />
    </svg>
  )
}

export const SearchIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
      />
    </svg>
  )
}

export const ChevronRightUpIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-4 h-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
      />
    </svg>
  )
}

export const WebsiteIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
      />
    </svg>
  )
}

export const ThesisIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
      />
    </svg>
  )
}

export const VideoIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
      />
    </svg>
  )
}

export const YoutubeIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
      />
    </svg>
  )
}

export const ArticleIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
      />
    </svg>
  )
}

export const PodcastIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
      />
    </svg>
  )
}

export const FacebookIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
      />
    </svg>
  )
}

export const TwitterIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09'
      />
    </svg>
  )
}

export const InstagramIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
      />
    </svg>
  )
}

export const PsychedelicDBIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={cn('w-7 h-7', className)}
      viewBox='0 0 127 127'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M107.156 33.7344C107.156 45.7888 87.6088 55.5625 63.5 55.5625C39.3912 55.5625 19.8438 45.7888 19.8438 33.7344M107.156 33.7344C107.156 21.68 87.6088 11.9062 63.5 11.9062C39.3912 11.9062 19.8438 21.68 19.8438 33.7344M107.156 33.7344V93.2656C107.156 105.32 87.6088 115.094 63.5 115.094C39.3912 115.094 19.8438 105.32 19.8438 93.2656V33.7344M107.156 33.7344V53.5781M19.8438 33.7344V53.5781M107.156 53.5781V73.4219C107.156 85.4763 87.6088 95.25 63.5 95.25C39.3912 95.25 19.8438 85.4763 19.8438 73.4219V53.5781M107.156 53.5781C107.156 65.6325 87.6088 75.4062 63.5 75.4062C39.3912 75.4062 19.8438 65.6325 19.8438 53.5781'
        strokeWidth={4}
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fill='currentColor'
        d='M91.001 33.6098C90.8383 33.7685 90.6637 33.9153 90.511 34.084C85.888 39.2248 80.4794 43.2703 74.043 45.8695C70.4776 47.308 66.7753 48.0857 62.9122 47.9925C59.3329 47.9052 55.9024 47.0977 52.6128 45.7227C46.1605 43.0263 40.7321 38.9153 36.1448 33.6614C36.1111 33.6217 36.0853 33.5741 36 33.4511C36.8551 32.5443 37.6885 31.592 38.5932 30.713C42.4046 27.0047 46.6566 23.9215 51.5255 21.741C55.6901 19.8739 60.0353 18.8224 64.6265 19.0247C68.4558 19.1934 72.0946 20.1834 75.5688 21.7787C81.3921 24.4512 86.3741 28.2508 90.6121 33.0443C90.7272 33.1733 90.8681 33.2804 90.9971 33.3975C91.001 33.4669 91.001 33.5384 91.001 33.6098ZM63.5134 22.2271C57.333 22.2251 52.2477 27.3024 52.2358 33.4848C52.2239 39.6633 57.2933 44.7544 63.4817 44.7782C69.674 44.8021 74.795 39.6891 74.787 33.4907C74.7771 27.3063 69.6958 22.229 63.5134 22.2271ZM86.6499 33.5007C83.3623 30.2349 79.773 27.5087 75.5707 25.3599C78.8286 30.8321 78.8286 36.1772 75.5727 41.6434C79.779 39.4926 83.3682 36.7625 86.6499 33.5007ZM40.3729 33.5027C43.6626 36.7685 47.2498 39.4946 51.4501 41.6434C48.1903 36.1713 48.1922 30.8261 51.4521 25.352C47.2498 27.5286 43.6546 30.2468 40.3729 33.5027Z'
      />
      <path
        fill='currentColor'
        d='M58.6816 33.5006C58.6816 30.8162 60.8364 28.6694 63.5268 28.6733C66.2073 28.6773 68.3481 30.836 68.3422 33.5304C68.3362 36.1812 66.1815 38.3299 63.5248 38.3339C60.8403 38.3359 58.6816 36.1831 58.6816 33.5006ZM65.122 33.5165C65.1319 32.6693 64.38 31.9034 63.5268 31.8935C62.6796 31.8836 61.9137 32.6356 61.9038 33.4868C61.8939 34.334 62.6459 35.0998 63.499 35.1097C64.3442 35.1216 65.1101 34.3697 65.122 33.5165Z'
      />
    </svg>
  )
}

export const CollaspeIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.2}
      stroke='currentColor'
      className={cn('w-5 h-5', className)}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
    </svg>
  )
}

export const TelegramIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      viewBox='0 0 71 59'
      className={cn('w-6 h-6', className)}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.87938 25.4047C23.9381 17.0789 36.6548 11.5884 43.0131 8.93327C61.1646 1.3613 64.9486 0.041949 67.4004 0.000975226C68.3038 -0.0182924 69.1903 0.248371 69.9339 0.763086C70.4561 1.21756 70.7887 1.85234 70.8656 2.54135C70.9961 3.39522 71.0317 4.26096 70.9718 5.1227C69.9911 15.4891 65.7331 40.6388 63.5674 52.2508C62.6521 57.1676 60.8459 58.8066 59.0969 58.9705C56.0976 59.2491 53.6539 57.5118 50.9488 55.5779C50.2378 55.0698 49.5022 54.5371 48.7421 54.0454C45.7346 52.0623 43.4136 50.4807 41.0925 48.8909C38.9594 47.4323 36.8182 45.9818 34.1457 44.2117C28.5965 40.5405 30.9175 38.2951 34.0232 35.2958C34.5435 34.7961 35.0557 34.288 35.5596 33.7716C35.7885 33.5339 36.9081 32.4932 38.4854 31.0182L38.7535 30.7681C43.8816 25.9836 53.3313 17.167 53.5722 16.1283C53.6131 15.9562 53.6539 15.3088 53.2698 14.9728C52.8939 14.6286 52.3218 14.7434 51.9132 14.8417C51.3411 14.9728 42.1468 21.0615 24.3385 33.116C21.7314 34.9189 19.3695 35.7875 17.2446 35.7383C14.9154 35.6892 10.4205 34.419 7.086 33.3291L5.65579 32.8784L5.64466 32.8748C2.25868 31.8031 -0.228276 31.016 0.0166363 29.0268C0.163744 27.8468 1.79011 26.634 4.87938 25.4047Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const DeselectAllIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
      />
    </svg>
  )
}

export const UserCircleIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.25}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
      />
    </svg>
  )
}

export const BookOpenIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.7}
      stroke='currentColor'
      className={cn('size-5', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
      />
    </svg>
  )
}

export const SlashIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m9 20.247 6-16.5' />
    </svg>
  )
}

export const LinkIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'
      />
    </svg>
  )
}

export const BarArrowDownIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25'
      />
    </svg>
  )
}

export const BarArrowUpIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12'
      />
    </svg>
  )
}

export const ArrowLeftIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className={cn('size-3', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
      />
    </svg>
  )
}

export const ChevronRightIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m8.25 4.5 7.5 7.5-7.5 7.5'
      />
    </svg>
  )
}

export const ChevronLeftIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 19.5 8.25 12l7.5-7.5'
      />
    </svg>
  )
}

export const DocumentIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
      />
    </svg>
  )
}

export const TheEye = ({ className }: Props): JSX.Element => {
  return (
    <svg
      viewBox='0 0 166 81'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('w-24', className)}
    >
      <path d='M165.736 40.5021C165.246 40.9421 164.719 41.3492 164.259 41.8167C150.329 56.0683 134.031 67.2836 114.636 74.4891C103.892 78.4769 92.7357 80.6331 81.0952 80.3746C70.3096 80.1326 59.9724 77.8939 50.0597 74.0821C30.617 66.607 14.2592 55.2102 0.436445 40.6451C0.334807 40.5351 0.257084 40.4031 0 40.0621C2.57682 37.5484 5.08788 34.9082 7.81417 32.4715C19.2993 22.1912 32.1116 13.6436 46.7834 7.59863C59.3327 2.42274 72.4261 -0.492478 86.2608 0.0685636C97.7997 0.536099 108.765 3.28081 119.233 7.70314C136.781 15.1122 151.793 25.6455 164.564 38.9345C164.911 39.292 165.335 39.589 165.724 39.9135C165.736 40.1061 165.736 40.3041 165.736 40.5021ZM82.9068 8.94623C64.2831 8.94073 48.9596 23.0163 48.9238 40.1556C48.8879 57.2838 64.1635 71.3979 82.8111 71.4639C101.471 71.5299 116.902 57.3553 116.878 40.1721C116.848 23.0273 101.536 8.95173 82.9068 8.94623ZM152.624 40.1996C142.718 31.1459 131.902 23.5883 119.239 17.6314C129.056 32.8015 129.056 47.6196 119.245 62.7733C131.92 56.8108 142.736 49.2422 152.624 40.1996ZM13.1771 40.2051C23.0898 49.2587 33.8993 56.8163 46.5562 62.7733C36.7332 47.6031 36.7392 32.785 46.5622 17.6094C33.8993 23.6433 23.0659 31.1789 13.1771 40.2051Z' />
      <path d='M68.3428 40.2009C68.3428 32.7588 74.8356 26.8074 82.9428 26.8184C91.02 26.8294 97.471 32.8138 97.4531 40.2834C97.4352 47.6319 90.9423 53.5889 82.9368 53.5999C74.8476 53.6054 68.3428 47.6374 68.3428 40.2009ZM87.7497 40.2449C87.7795 37.8962 85.5136 35.7731 82.9428 35.7455C80.3899 35.718 78.0821 37.8027 78.0522 40.1624C78.0223 42.5111 80.2882 44.6342 82.8591 44.6617C85.406 44.6947 87.7138 42.6101 87.7497 40.2449Z' />
    </svg>
  )
}

export const KeyIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('size-4', className)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
      />
    </svg>
  )
}

export const ChatGPTIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      width='41'
      height='41'
      viewBox='0 0 41 41'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('size-3.5', className)}
      role='img'
    >
      <path
        d='M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z'
        fill='currentColor'
      ></path>
    </svg>
  )
}
