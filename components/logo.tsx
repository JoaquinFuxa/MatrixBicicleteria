import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-heading text-2xl font-bold tracking-tight select-none',
        className,
      )}
    >
      <span className="text-foreground">MA</span>
      <span className="text-primary">TRIX</span>
    </span>
  )
}
