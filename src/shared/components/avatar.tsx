interface IAvatarProps {
  seed: string
}

export function Avatar({ seed }: IAvatarProps) {
  return (
    <img
      src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(seed)}`}
      alt={seed}
      className='w-8 h-8 rounded-full'
    />
  )
}
