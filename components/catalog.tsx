'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import {
  type Bike,
  type Category,
  BRANDS,
  CATEGORIES,
  formatPrice,
} from '@/lib/bikes'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

export function Catalog({
  bikes,
  onViewDetails,
}: {
  bikes: Bike[]
  onViewDetails: (bike: Bike) => void
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'Todas'>('Todas')
  const [brand, setBrand] = useState<string>('Todas')
  const maxAvailable = useMemo(
    () => Math.max(5000, ...bikes.map((b) => b.price)),
    [bikes],
  )
  const [maxPrice, setMaxPrice] = useState<number>(maxAvailable)

  const filtered = useMemo(() => {
    return bikes.filter((b) => {
      const matchesQuery =
        query.trim() === '' ||
        `${b.name} ${b.brand} ${b.category}`
          .toLowerCase()
          .includes(query.toLowerCase())
      const matchesCategory = category === 'Todas' || b.category === category
      const matchesBrand = brand === 'Todas' || b.brand === brand
      const matchesPrice = b.price <= maxPrice
      return matchesQuery && matchesCategory && matchesBrand && matchesPrice
    })
  }, [bikes, query, category, brand, maxPrice])

  return (
    <section id="catalogo" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-primary">Catálogo</span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Encontrá tu próxima bicicleta
          </h2>
          <p className="max-w-xl text-muted-foreground text-pretty">
            Filtrá por categoría, marca y precio para descubrir el modelo ideal
            para tu estilo de manejo.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por modelo o marca..."
                  className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30"
                />
              </div>

              {/* Brand */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="brand-filter"
                  className="text-sm text-muted-foreground"
                >
                  Marca
                </label>
                <select
                  id="brand-filter"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/30"
                >
                  <option value="Todas">Todas</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Category chips */}
              <div className="flex flex-wrap items-center gap-2">
                {(['Todas', ...CATEGORIES] as const).map((c) => (
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

              {/* Price */}
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                <label htmlFor="price-filter" className="text-sm text-muted-foreground">
                  Hasta
                </label>
                <input
                  id="price-filter"
                  type="range"
                  min={500}
                  max={maxAvailable}
                  step={100}
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

        {/* Results */}
        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'resultado' : 'resultados'}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((bike) => (
              <ProductCard
                key={bike.id}
                bike={bike}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-heading text-lg font-semibold">
              No encontramos bicicletas
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
