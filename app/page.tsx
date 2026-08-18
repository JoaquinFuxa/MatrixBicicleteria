'use client'

import { useState } from 'react'
import { type Bike, INITIAL_BIKES } from '@/lib/bikes'
import { type Part, INITIAL_PARTS } from '@/lib/parts'
import { type Service, INITIAL_SERVICES } from '@/lib/services'
import type { BikeFormValues } from '@/components/bike-form'
import type { PartFormValues } from '@/components/part-form'
import type { ServiceFormValues } from '@/components/service-form'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { CatalogHub } from '@/components/catalog-hub'
import { Reviews } from '@/components/reviews'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { AdminPanel } from '@/components/admin-panel'
import { BikeDetail } from '@/components/bike-detail'
import { PartDetail } from '@/components/part-detail'
import { ServiceDetail } from '@/components/service-detail'
import { AdminLogin } from '@/components/admin-login'

type DetailView =
  | { type: 'bike'; item: Bike }
  | { type: 'part'; item: Part }
  | { type: 'service'; item: Service }

export default function Page() {
  const [bikes, setBikes] = useState<Bike[]>(INITIAL_BIKES)
  const [parts, setParts] = useState<Part[]>(INITIAL_PARTS)
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [isAdmin, setIsAdmin] = useState(false)
  const [detail, setDetail] = useState<DetailView | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  function handleCreateBike(values: BikeFormValues) {
    setBikes((prev) => [{ ...values, id: crypto.randomUUID() }, ...prev])
  }

  function handleUpdateBike(id: string, values: BikeFormValues) {
    setBikes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...values } : b)),
    )
  }

  function handleDeleteBike(id: string) {
    setBikes((prev) => prev.filter((b) => b.id !== id))
  }

  function handleCreatePart(values: PartFormValues) {
    setParts((prev) => [{ ...values, id: crypto.randomUUID() }, ...prev])
  }

  function handleUpdatePart(id: string, values: PartFormValues) {
    setParts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...values } : p)),
    )
  }

  function handleDeletePart(id: string) {
    setParts((prev) => prev.filter((p) => p.id !== id))
  }

  function handleCreateService(values: ServiceFormValues) {
    setServices((prev) => [{ ...values, id: crypto.randomUUID() }, ...prev])
  }

  function handleUpdateService(id: string, values: ServiceFormValues) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...values } : s)),
    )
  }

  function handleDeleteService(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  function scrollTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function openDetail(next: DetailView) {
    setDetail(next)
    scrollTop()
  }

  function handleToggleAdmin() {
    if (isAdmin) {
      setIsAdmin(false)
      scrollTop()
    } else {
      setLoginOpen(true)
    }
  }

  function handleLoginSuccess() {
    setLoginOpen(false)
    setDetail(null)
    setIsAdmin(true)
    scrollTop()
  }

  return (
    <div className="min-h-dvh bg-background">
      <Navbar isAdmin={isAdmin} onToggleAdmin={handleToggleAdmin} />
      <main>
        {isAdmin ? (
          <div className="pt-16">
            <AdminPanel
              bikes={bikes}
              onCreateBike={handleCreateBike}
              onUpdateBike={handleUpdateBike}
              onDeleteBike={handleDeleteBike}
              parts={parts}
              onCreatePart={handleCreatePart}
              onUpdatePart={handleUpdatePart}
              onDeletePart={handleDeletePart}
              services={services}
              onCreateService={handleCreateService}
              onUpdateService={handleUpdateService}
              onDeleteService={handleDeleteService}
            />
          </div>
        ) : detail ? (
          <div className="pt-16">
            {detail.type === 'bike' && (
              <BikeDetail
                bike={detail.item}
                onBack={() => setDetail(null)}
              />
            )}
            {detail.type === 'part' && (
              <PartDetail
                part={detail.item}
                onBack={() => setDetail(null)}
              />
            )}
            {detail.type === 'service' && (
              <ServiceDetail
                service={detail.item}
                onBack={() => setDetail(null)}
              />
            )}
          </div>
        ) : (
          <>
            <Hero />
            <CatalogHub
              bikes={bikes}
              parts={parts}
              services={services}
              onViewBike={(bike) => openDetail({ type: 'bike', item: bike })}
              onViewPart={(part) => openDetail({ type: 'part', item: part })}
              onViewService={(service) =>
                openDetail({ type: 'service', item: service })
              }
            />
            <Reviews />
            <Contact />
          </>
        )}
      </main>
      <SiteFooter />

      <AdminLogin
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}
