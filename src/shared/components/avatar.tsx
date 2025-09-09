import { cn } from '@/lib/utils'
interface IAvatarProps {
  seed: string
  className?: string
}

export function Avatar({ seed, className }: IAvatarProps) {
  return (
    <img
      src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(seed)}`}
      alt={seed}
      className={cn('w-8 h-8 rounded-full', className)}
    />
  )
}
