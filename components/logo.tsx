import Image from 'next/image'
import { cn } from '@/lib/utils'
import logoImage from '@/resource/logoMatrix.png'

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logoImage}
      alt="MATRIX Bicicletería"
      className={cn('h-30 w-fit max-w-full object-contain object-left select-none', className)}
      style={{ width: 'auto' }}
      priority
    />
  )
}
