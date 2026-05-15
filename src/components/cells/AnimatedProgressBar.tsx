import { CustomProgress } from './ProgressBarCustom'

interface AnimatedProgressBarProps {
  value: number
  max?: number
  indicatorColor?: 'blue' | 'emerald' | 'orange'
  size?: 'xthin' | 'md'
}

export function AnimatedProgressBar({
  value,
  max = 100,
  indicatorColor = 'blue',
  size = 'md'
}: AnimatedProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100)

  return (
    <CustomProgress
      value={percent}
      indicatorColor={indicatorColor}
      size={size}
    />
  )
}
