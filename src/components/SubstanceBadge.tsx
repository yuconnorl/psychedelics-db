import { babyPacifier, cactus, flowerLotus, frogFace } from '@lucide/lab'
import {
  Atom,
  Brain,
  CircleDotDashed,
  createLucideIcon,
  Leaf,
  LeafyGreen,
  Mailbox,
  MessageCircleHeart,
  Snowflake,
  Soup,
  Wheat,
} from 'lucide-react'

import { AmanitaIcon, CannabisIcon, MushroomIcon } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { substanceOptions } from '@/config/options'
import { cn } from '@/lib/utils'

type SubstanceBadgeProps = {
  substance: string
  className?: string
  onClick?: (e) => void
}

const SubstanceBadge = ({
  substance,
  className,
  onClick,
}: SubstanceBadgeProps) => {
  const FrogFace = createLucideIcon('frogFace', frogFace)
  const FlowerLotus = createLucideIcon('flowerLotus', flowerLotus)
  const Cactus = createLucideIcon('cactus', cactus)
  const BabyPacifier = createLucideIcon('babyPacifier', babyPacifier)

  const substancesIconMap = {
    lsd: <Mailbox size={16} strokeWidth={1.5} />,
    '5-meo-dmt': <FrogFace size={16} strokeWidth={1.5} />,
    cannabis: <CannabisIcon />,
    mdma: <MessageCircleHeart size={16} strokeWidth={1.5} />,
    ayahuasca: <Soup size={16} strokeWidth={1.5} />,
    peyote: <FlowerLotus size={16} strokeWidth={1.5} />,
    mescaline: <Cactus size={16} strokeWidth={1.5} />,
    ibogaine: <Leaf size={16} strokeWidth={1.5} />,
    'lsd-analogs': <Wheat size={16} strokeWidth={1.5} />,
    lsa: <BabyPacifier size={16} strokeWidth={1.5} />,
    psilocybin: <MushroomIcon />,
    'amanita-muscaria': <AmanitaIcon />,
    unspecified: <Brain size={16} strokeWidth={1.6} />,
    salvia: <LeafyGreen size={16} strokeWidth={1.5} />,
    dmt: <Atom size={16} strokeWidth={1.5} />,
    ketamine: <CircleDotDashed size={16} strokeWidth={1.8} />,
    pcp: <Snowflake size={16} strokeWidth={1.5} />,
  }

  return (
    <Badge onClick={onClick} className={cn('flex gap-1', className)}>
      <span>{substancesIconMap[substance]}</span>
      <span>{substanceOptions[substance]}</span>
    </Badge>
  )
}

export default SubstanceBadge
