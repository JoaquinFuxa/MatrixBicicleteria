'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import {
  type Part,
  type PartCategory,
  PART_CATEGORIES,
  formatPrice,
} from '@/lib/parts'
import { PartCard } from '@/components/part-card'
import { cn } from '@/lib/utils'

export function PartsCatalog({
  parts,
  onViewDetails,
  embedded = false,
}: {
  parts: Part[]
  onViewDetails: (part: Part) => void
  embedded?: boolean
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<PartCategory | 'Todas'>('Todas')
  const maxAvailable = useMemo(
    () => Math.max(10, ...parts.map((p) => p.price)),
    [parts],
  )
  const [maxPrice, setMaxPrice] = useState<number>(maxAvailable)

  const filtered = useMemo(() => {
    return parts.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'Todas' || p.category === category
      const matchesPrice = p.price <= maxPrice
      return matchesQuery && matchesCategory && matchesPrice
    })
  }, [parts, query, category, maxPrice])

  return (
    <section
      id={embedded ? undefined : 'repuestos'}
      className={embedded ? '' : 'scroll-mt-16 border-b border-border'}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${embedded ? 'pb-16 lg:pb-24' : 'py-16 lg:py-24'}`}
      >
        {!embedded && (
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-primary">Repuestos</span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Catálogo de repuestos
            </h2>
            <p className="max-w-xl text-muted-foreground text-pretty">
              Frenos, cubiertas, cadenas, cámaras y más. Filtrá por categoría y
              consultá disponibilidad por WhatsApp.
            </p>
          </div>
        )}

        {embedded && (
          <div className="mb-8 flex flex-col gap-2">
            <h3 className="font-heading text-2xl font-bold tracking-tight">
              Repuestos
            </h3>
            <p className="text-sm text-muted-foreground">
              Frenos, cubiertas, cadenas, cámaras y más.
            </p>
          </div>
        )}

        <div className={`rounded-2xl border border-border bg-card p-4 sm:p-5 ${embedded ? '' : 'mt-10'}`}>
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar repuesto..."
                className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30"
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {(['Todas', ...PART_CATEGORIES] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                      category === c
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                <label htmlFor="parts-price-filter" className="text-sm text-muted-foreground">
                  Hasta
                </label>
                <input
                  id="parts-price-filter"
                  type="range"
                  min={5}
                  max={maxAvailable}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-40 accent-primary"
                />
                <span className="w-20 text-right text-sm font-medium text-foreground tabular-nums">
                  {formatPrice(maxPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'resultado' : 'resultados'}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-heading text-lg font-semibold">
              No encontramos repuestos
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Probá ajustar los filtros o la búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
