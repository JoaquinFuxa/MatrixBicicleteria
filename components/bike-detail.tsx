'use client'

import Image from 'next/image'
import { ArrowLeft, Check, MessageCircle } from 'lucide-react'
import { type Bike, buildWhatsAppUrl, formatPrice } from '@/lib/bikes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function BikeDetail({
  bike,
  onBack,
}: {
  bike: Bike
  onBack: () => void
}) {
  const outOfStock = bike.stock <= 0
  const lowStock = bike.stock > 0 && bike.stock <= 3

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          <ArrowLeft data-icon="inline-start" />
          Volver al catálogo
        </Button>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary">
            <Image
              src={bike.image || '/placeholder.svg'}
              alt={`${bike.brand} ${bike.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                {bike.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {bike.brand}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {bike.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-heading text-3xl font-bold text-primary">
                {formatPrice(bike.price)}
              </span>
              {outOfStock ? (
                <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs font-medium text-destructive">
                  Sin stock
                </span>
              ) : lowStock ? (
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  Últimas {bike.stock} unidades
                </span>
              ) : (
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                  En stock ({bike.stock} u.)
                </span>
              )}
            </div>

            {bike.description && (
              <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
                {bike.description}
              </p>
            )}

            {bike.specs && bike.specs.length > 0 && (
              <div className="mt-8">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                  Especificaciones
                </h2>
                <dl className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                  {bike.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <dt className="text-sm text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-medium text-foreground text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* WhatsApp CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppUrl(bike)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-base font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366]/40',
                )}
              >
                <MessageCircle className="size-5" />
                Consultar por WhatsApp
              </a>
            </div>

            <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Garantía oficial de fábrica
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Envío a todo el país
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Service y ajuste inicial sin cargo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
