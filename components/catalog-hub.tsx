'use client'

import { useEffect, useState } from 'react'
import { type Bike } from '@/lib/bikes'
import { type Part } from '@/lib/parts'
import { type Service } from '@/lib/services'
import { Catalog } from '@/components/catalog'
import { PartsCatalog } from '@/components/parts-catalog'
import { ServicesSection } from '@/components/services-section'
import {
  CatalogSelector,
  type CatalogTab,
  CATALOG_TAB_HASH,
  HASH_TO_CATALOG_TAB,
} from '@/components/catalog-selector'

type CatalogHubProps = {
  bikes: Bike[]
  parts: Part[]
  services: Service[]
  onViewBike: (bike: Bike) => void
  onViewPart: (part: Part) => void
  onViewService: (service: Service) => void
}

export function CatalogHub({
  bikes,
  parts,
  services,
  onViewBike,
  onViewPart,
  onViewService,
}: CatalogHubProps) {
  const [tab, setTab] = useState<CatalogTab>('taller')

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace('#', '')
      const mapped = HASH_TO_CATALOG_TAB[hash]
      if (mapped) setTab(mapped)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  function handleTabChange(next: CatalogTab) {
    setTab(next)
    window.history.replaceState(null, '', `#${CATALOG_TAB_HASH[next]}`)
  }

  return (
    <div id="catalogo" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24 pb-16">
        <CatalogSelector value={tab} onChange={handleTabChange} />
      </div>

      {tab === 'taller' && (
        <ServicesSection services={services} onViewDetails={onViewService} embedded />
      )}
      {tab === 'bicicleta' && (
        <Catalog bikes={bikes} onViewDetails={onViewBike} embedded />
      )}
      {tab === 'repuesto' && (
        <PartsCatalog parts={parts} onViewDetails={onViewPart} embedded />
      )}
    </div>
  )
}
