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

export const BarArrowDown = ({ className }: Props): JSX.Element => {
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

export const BarArrowUp = ({ className }: Props): JSX.Element => {
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
