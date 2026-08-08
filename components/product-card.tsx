import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { type Bike, formatPrice } from '@/lib/bikes'
import { Button } from '@/components/ui/button'

export function ProductCard({
  bike,
  onViewDetails,
}: {
  bike: Bike
  onViewDetails: (bike: Bike) => void
}) {
  const outOfStock = bike.stock <= 0
  const lowStock = bike.stock > 0 && bike.stock <= 3

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={bike.image || '/placeholder.svg'}
          alt={`${bike.brand} ${bike.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {bike.category}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          {outOfStock ? (
            <span className="rounded-full bg-destructive/20 px-2.5 py-1 text-xs font-medium text-destructive backdrop-blur-sm">
              Sin stock
            </span>
          ) : lowStock ? (
            <span className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              Últimas unidades
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm">
              En stock
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {bike.brand}
        </p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-balance">
          {bike.name}
        </h3>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="font-heading text-2xl font-bold text-primary">
            {formatPrice(bike.price)}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(bike)}
          className="mt-4 h-9 w-full"
        >
          Ver más detalles
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      </div>
    </article>
  )
}
