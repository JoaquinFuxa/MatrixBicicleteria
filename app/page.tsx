'use client'

import { useState } from 'react'
import { type Bike, INITIAL_BIKES } from '@/lib/bikes'
import type { BikeFormValues } from '@/components/bike-form'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Catalog } from '@/components/catalog'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { AdminPanel } from '@/components/admin-panel'
import { BikeDetail } from '@/components/bike-detail'
import { AdminLogin } from '@/components/admin-login'

export default function Page() {
  const [bikes, setBikes] = useState<Bike[]>(INITIAL_BIKES)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  function handleCreate(values: BikeFormValues) {
    const newBike: Bike = { ...values, id: crypto.randomUUID() }
    setBikes((prev) => [newBike, ...prev])
  }

  function handleUpdate(id: string, values: BikeFormValues) {
    setBikes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...values } : b)),
    )
  }

  function handleDelete(id: string) {
    setBikes((prev) => prev.filter((b) => b.id !== id))
  }

  function scrollTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleViewDetails(bike: Bike) {
    setSelectedBike(bike)
    scrollTop()
  }

  function handleToggleAdmin() {
    if (isAdmin) {
      // Cerrar sesión
      setIsAdmin(false)
      scrollTop()
    } else {
      // Requiere login
      setLoginOpen(true)
    }
  }

  function handleLoginSuccess() {
    setLoginOpen(false)
    setSelectedBike(null)
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
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        ) : selectedBike ? (
          <div className="pt-16">
            <BikeDetail
              bike={selectedBike}
              onBack={() => setSelectedBike(null)}
            />
          </div>
        ) : (
          <>
            <Hero />
            <Catalog bikes={bikes} onViewDetails={handleViewDetails} />
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
