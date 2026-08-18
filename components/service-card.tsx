import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { type Service, formatServicePrice } from '@/lib/services'
import { Button } from '@/components/ui/button'

export function ServiceCard({
  service,
  onViewDetails,
}: {
  service: Service
  onViewDetails: (service: Service) => void
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={service.image || '/placeholder.svg'}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            Taller
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold text-balance">
          {service.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
          <span className="font-heading text-2xl font-bold text-primary">
            {formatServicePrice(service)}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5 text-primary" />
            {service.estimatedTime}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(service)}
          className="mt-4 h-9 w-full"
        >
          Ver más detalles
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      </div>
    </article>
  )
}
