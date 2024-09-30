const ICONS = [
  'bar-arrow-down',
  'bar-arrow-up',
  'book-open',
  'slash',
  'link',
  'user-circle',
  'x-circle',
  'telegram',
] as const

type IconId = (typeof ICONS)[number]

type Props = {
  id: IconId
  class?: string
  viewBox?: string
  strokeWidth?: number
}
const IconsWithSprite = ({ id, ...props }: Props): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke='currentColor'
    {...props}
  >
    <use href={`/sprite.svg#${id}`} />
  </svg>
)

export default IconsWithSprite
