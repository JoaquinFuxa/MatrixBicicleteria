'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Bike, Package, Pencil, Plus, Trash2, Wrench } from 'lucide-react'
import { type Bike as BikeType, formatPrice } from '@/lib/bikes'
import { type Part, formatPrice as formatPartPrice } from '@/lib/parts'
import {
  type Service,
  formatServicePrice,
} from '@/lib/services'
import { Button } from '@/components/ui/button'
import { BikeForm, type BikeFormValues } from '@/components/bike-form'
import { PartForm, type PartFormValues } from '@/components/part-form'
import { ServiceForm, type ServiceFormValues } from '@/components/service-form'
import { Modal } from '@/components/modal'
import { cn } from '@/lib/utils'

type AdminTab = 'bikes' | 'parts' | 'services'

type AdminPanelProps = {
  bikes: BikeType[]
  onCreateBike: (values: BikeFormValues) => void
  onUpdateBike: (id: string, values: BikeFormValues) => void
  onDeleteBike: (id: string) => void
  parts: Part[]
  onCreatePart: (values: PartFormValues) => void
  onUpdatePart: (id: string, values: PartFormValues) => void
  onDeletePart: (id: string) => void
  services: Service[]
  onCreateService: (values: ServiceFormValues) => void
  onUpdateService: (id: string, values: ServiceFormValues) => void
  onDeleteService: (id: string) => void
}

const TABS: { id: AdminTab; label: string; icon: typeof Bike }[] = [
  { id: 'bikes', label: 'Bicicletas', icon: Bike },
  { id: 'parts', label: 'Repuestos', icon: Package },
  { id: 'services', label: 'Servicios', icon: Wrench },
]

export function AdminPanel({
  bikes,
  onCreateBike,
  onUpdateBike,
  onDeleteBike,
  parts,
  onCreatePart,
  onUpdatePart,
  onDeletePart,
  services,
  onCreateService,
  onUpdateService,
  onDeleteService,
}: AdminPanelProps) {
  const [tab, setTab] = useState<AdminTab>('bikes')

  const [bikeFormOpen, setBikeFormOpen] = useState(false)
  const [editingBike, setEditingBike] = useState<BikeType | null>(null)
  const [deletingBike, setDeletingBike] = useState<BikeType | null>(null)

  const [partFormOpen, setPartFormOpen] = useState(false)
  const [editingPart, setEditingPart] = useState<Part | null>(null)
  const [deletingPart, setDeletingPart] = useState<Part | null>(null)

  const [serviceFormOpen, setServiceFormOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deletingService, setDeletingService] = useState<Service | null>(null)

  const bikeStats = [
    { label: 'Modelos', value: bikes.length },
    {
      label: 'Unidades en stock',
      value: bikes.reduce((sum, b) => sum + b.stock, 0),
    },
    { label: 'Sin stock', value: bikes.filter((b) => b.stock <= 0).length },
  ]

  const partStats = [
    { label: 'Repuestos', value: parts.length },
    {
      label: 'Unidades en stock',
      value: parts.reduce((sum, p) => sum + p.stock, 0),
    },
    { label: 'Sin stock', value: parts.filter((p) => p.stock <= 0).length },
  ]

  const serviceStats = [
    { label: 'Servicios', value: services.length },
    {
      label: 'Con rango de precio',
      value: services.filter((s) => s.priceMax !== undefined).length,
    },
    {
      label: 'Consultar precio',
      value: services.filter((s) => s.price === null).length,
    },
  ]

  const tabConfig = {
    bikes: {
      title: 'Gestión de bicicletas',
      description: 'Agregá, editá o eliminá bicicletas del catálogo público.',
      addLabel: 'Agregar bicicleta',
      stats: bikeStats,
      onAdd: () => {
        setEditingBike(null)
        setBikeFormOpen(true)
      },
    },
    parts: {
      title: 'Gestión de repuestos',
      description: 'Administrá el catálogo de repuestos y accesorios.',
      addLabel: 'Agregar repuesto',
      stats: partStats,
      onAdd: () => {
        setEditingPart(null)
        setPartFormOpen(true)
      },
    },
    services: {
      title: 'Gestión de servicios',
      description: 'Administrá los servicios del taller.',
      addLabel: 'Agregar servicio',
      stats: serviceStats,
      onAdd: () => {
        setEditingService(null)
        setServiceFormOpen(true)
      },
    },
  }[tab]

  return (
    <section className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            Modo Administrador
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight">
            Panel de administración
          </h2>
          <p className="text-muted-foreground">
            Gestioná bicicletas, repuestos y servicios desde un solo lugar.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-px">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                'inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors -mb-px',
                tab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-xl font-semibold">
              {tabConfig.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tabConfig.description}
            </p>
          </div>
          <Button size="lg" className="h-11 px-5" onClick={tabConfig.onAdd}>
            <Plus data-icon="inline-start" />
            {tabConfig.addLabel}
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {tabConfig.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-heading text-3xl font-bold tabular-nums">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Bikes table */}
        {tab === 'bikes' && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Bicicleta</th>
                    <th className="px-5 py-3 font-medium">Categoría</th>
                    <th className="px-5 py-3 font-medium">Precio</th>
                    <th className="px-5 py-3 font-medium">Stock</th>
                    <th className="px-5 py-3 text-right font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {bikes.map((bike) => (
                    <tr
                      key={bike.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                            <Image
                              src={bike.image || '/placeholder.svg'}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{bike.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {bike.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {bike.category}
                      </td>
                      <td className="px-5 py-3 font-medium text-primary">
                        {formatPrice(bike.price)}
                      </td>
                      <td className="px-5 py-3">{bike.stock} u.</td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            aria-label={`Editar ${bike.name}`}
                            onClick={() => {
                              setEditingBike(bike)
                              setBikeFormOpen(true)
                            }}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            aria-label={`Eliminar ${bike.name}`}
                            onClick={() => setDeletingBike(bike)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bikes.length === 0 && (
              <EmptyState message="No hay bicicletas cargadas" />
            )}
          </div>
        )}

        {/* Parts table */}
        {tab === 'parts' && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Repuesto</th>
                    <th className="px-5 py-3 font-medium">Categoría</th>
                    <th className="px-5 py-3 font-medium">Precio</th>
                    <th className="px-5 py-3 font-medium">Stock</th>
                    <th className="px-5 py-3 text-right font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part) => (
                    <tr
                      key={part.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                            <Image
                              src={part.image || '/placeholder.svg'}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </div>
                          <p className="font-medium">{part.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {part.category}
                      </td>
                      <td className="px-5 py-3 font-medium text-primary">
                        {formatPartPrice(part.price)}
                      </td>
                      <td className="px-5 py-3">{part.stock} u.</td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            aria-label={`Editar ${part.name}`}
                            onClick={() => {
                              setEditingPart(part)
                              setPartFormOpen(true)
                            }}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            aria-label={`Eliminar ${part.name}`}
                            onClick={() => setDeletingPart(part)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parts.length === 0 && (
              <EmptyState message="No hay repuestos cargados" />
            )}
          </div>
        )}

        {/* Services table */}
        {tab === 'services' && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Servicio</th>
                    <th className="px-5 py-3 font-medium">Precio</th>
                    <th className="px-5 py-3 font-medium">Tiempo</th>
                    <th className="px-5 py-3 text-right font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                            <Image
                              src={service.image || '/placeholder.svg'}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-medium text-primary">
                        {formatServicePrice(service)}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {service.estimatedTime}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            aria-label={`Editar ${service.name}`}
                            onClick={() => {
                              setEditingService(service)
                              setServiceFormOpen(true)
                            }}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            aria-label={`Eliminar ${service.name}`}
                            onClick={() => setDeletingService(service)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {services.length === 0 && (
              <EmptyState message="No hay servicios cargados" />
            )}
          </div>
        )}
      </div>

      <BikeForm
        open={bikeFormOpen}
        onClose={() => {
          setBikeFormOpen(false)
          setEditingBike(null)
        }}
        onSubmit={(values) => {
          if (editingBike) onUpdateBike(editingBike.id, values)
          else onCreateBike(values)
          setBikeFormOpen(false)
          setEditingBike(null)
        }}
        initialBike={editingBike}
      />

      <PartForm
        open={partFormOpen}
        onClose={() => {
          setPartFormOpen(false)
          setEditingPart(null)
        }}
        onSubmit={(values) => {
          if (editingPart) onUpdatePart(editingPart.id, values)
          else onCreatePart(values)
          setPartFormOpen(false)
          setEditingPart(null)
        }}
        initialPart={editingPart}
      />

      <ServiceForm
        open={serviceFormOpen}
        onClose={() => {
          setServiceFormOpen(false)
          setEditingService(null)
        }}
        onSubmit={(values) => {
          if (editingService) onUpdateService(editingService.id, values)
          else onCreateService(values)
          setServiceFormOpen(false)
          setEditingService(null)
        }}
        initialService={editingService}
      />

      <Modal
        open={deletingBike !== null}
        onClose={() => setDeletingBike(null)}
        title="Eliminar bicicleta"
        description={
          deletingBike
            ? `¿Seguro que querés eliminar "${deletingBike.name}"?`
            : undefined
        }
      >
        <DeleteActions
          onCancel={() => setDeletingBike(null)}
          onConfirm={() => {
            if (deletingBike) onDeleteBike(deletingBike.id)
            setDeletingBike(null)
          }}
        />
      </Modal>

      <Modal
        open={deletingPart !== null}
        onClose={() => setDeletingPart(null)}
        title="Eliminar repuesto"
        description={
          deletingPart
            ? `¿Seguro que querés eliminar "${deletingPart.name}"?`
            : undefined
        }
      >
        <DeleteActions
          onCancel={() => setDeletingPart(null)}
          onConfirm={() => {
            if (deletingPart) onDeletePart(deletingPart.id)
            setDeletingPart(null)
          }}
        />
      </Modal>

      <Modal
        open={deletingService !== null}
        onClose={() => setDeletingService(null)}
        title="Eliminar servicio"
        description={
          deletingService
            ? `¿Seguro que querés eliminar "${deletingService.name}"?`
            : undefined
        }
      >
        <DeleteActions
          onCancel={() => setDeletingService(null)}
          onConfirm={() => {
            if (deletingService) onDeleteService(deletingService.id)
            setDeletingService(null)
          }}
        />
      </Modal>
    </section>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
      <Package className="size-8 text-muted-foreground" />
      <p className="font-medium">{message}</p>
    </div>
  )
}

function DeleteActions({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        <Trash2 data-icon="inline-start" />
        Eliminar
      </Button>
    </div>
  )
}
