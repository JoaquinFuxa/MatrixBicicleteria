'use client'

import Image from 'next/image'
import { ArrowLeft, Check, Clock, MessageCircle } from 'lucide-react'
import {
  type Service,
  buildServiceWhatsAppUrl,
  formatServicePrice,
} from '@/lib/services'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ServiceDetail({
  service,
  onBack,
}: {
  service: Service
  onBack: () => void
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          <ArrowLeft data-icon="inline-start" />
          Volver al catálogo
        </Button>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary">
            <Image
              src={service.image || '/placeholder.svg'}
              alt={service.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                Taller
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Servicio de taller
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {service.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-heading text-3xl font-bold text-primary">
                {formatServicePrice(service)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Clock className="size-3.5" />
                {service.estimatedTime}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
              {service.description}
            </p>

            <div className="mt-8">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                Detalles
              </h2>
              <dl className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-muted-foreground">Precio</dt>
                  <dd className="text-sm font-medium text-primary">
                    {formatServicePrice(service)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-muted-foreground">
                    Tiempo estimado
                  </dt>
                  <dd className="text-sm font-medium text-foreground">
                    {service.estimatedTime}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildServiceWhatsAppUrl(service)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-base font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366]/40',
                )}
              >
                <MessageCircle className="size-5" />
                Solicitar por WhatsApp
              </a>
            </div>

            <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Mecánicos especializados en ciclismo
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Presupuesto sin compromiso
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Turnos coordinados por WhatsApp
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
