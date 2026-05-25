import { Microscope } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'

interface InspectButtonProps {
  onClick: () => void
  className?: string
}

export function InspectButton({ onClick, className = '' }: InspectButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center justify-center p-1.5 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-background/50 ${className}`}
          aria-label="Inspect insight"
        >
          <Microscope size={16} strokeWidth={2} />
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>Inspect insight</TooltipContent>
    </Tooltip>
  )
}
