'use client'

import { Bike, Package, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CatalogTab = 'taller' | 'bicicleta' | 'repuesto'

const OPTIONS: {
  id: CatalogTab
  label: string
  icon: typeof Bike
  hash: string
}[] = [
  { id: 'taller', label: 'Taller', icon: Wrench, hash: 'taller' },
  { id: 'bicicleta', label: 'Bicicleta', icon: Bike, hash: 'catalogo' },
  { id: 'repuesto', label: 'Repuesto', icon: Package, hash: 'repuestos' },
]

export function CatalogSelector({
  value,
  onChange,
}: {
  value: CatalogTab
  onChange: (tab: CatalogTab) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-primary">Catálogo</span>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        Explorá nuestros productos y servicios
      </h2>
      <p className="max-w-xl text-muted-foreground text-pretty">
        Elegí una categoría para ver el catálogo correspondiente.
      </p>

      <div
        className="mt-4 inline-flex w-full flex-col gap-2 rounded-2xl border border-border bg-card p-2 sm:w-auto sm:flex-row"
        role="tablist"
        aria-label="Selector de catálogo"
      >
        {OPTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={value === id}
            onClick={() => onChange(id)}
            className={cn(
              'inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors sm:flex-initial sm:min-w-[140px]',
              value === id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export const CATALOG_TAB_HASH: Record<CatalogTab, string> = {
  taller: 'taller',
  bicicleta: 'catalogo',
  repuesto: 'repuestos',
}

export const HASH_TO_CATALOG_TAB: Record<string, CatalogTab> = {
  taller: 'taller',
  catalogo: 'bicicleta',
  bicicleta: 'bicicleta',
  repuestos: 'repuesto',
  repuesto: 'repuesto',
}
