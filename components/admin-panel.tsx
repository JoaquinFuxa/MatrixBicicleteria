'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Package, Pencil, Plus, Trash2 } from 'lucide-react'
import { type Bike, formatPrice } from '@/lib/bikes'
import { Button } from '@/components/ui/button'
import { BikeForm, type BikeFormValues } from '@/components/bike-form'
import { Modal } from '@/components/modal'

type AdminPanelProps = {
  bikes: Bike[]
  onCreate: (values: BikeFormValues) => void
  onUpdate: (id: string, values: BikeFormValues) => void
  onDelete: (id: string) => void
}

export function AdminPanel({ bikes, onCreate, onUpdate, onDelete }: AdminPanelProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Bike | null>(null)
  const [deleting, setDeleting] = useState<Bike | null>(null)

  const totalUnits = bikes.reduce((sum, b) => sum + b.stock, 0)
  const outOfStock = bikes.filter((b) => b.stock <= 0).length

  const stats = [
    { label: 'Modelos', value: bikes.length },
    { label: 'Unidades en stock', value: totalUnits },
    { label: 'Sin stock', value: outOfStock },
  ]

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(bike: Bike) {
    setEditing(bike)
    setFormOpen(true)
  }

  function handleSubmit(values: BikeFormValues) {
    if (editing) {
      onUpdate(editing.id, values)
    } else {
      onCreate(values)
    }
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <section className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Modo Administrador
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Gestión de catálogo
            </h2>
            <p className="text-muted-foreground">
              Agregá, editá o eliminá bicicletas del catálogo público.
            </p>
          </div>
          <Button size="lg" className="h-11 px-5" onClick={openCreate}>
            <Plus data-icon="inline-start" />
            Agregar Nueva Bicicleta
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
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

        {/* Table */}
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
                          <p className="font-medium text-foreground">
                            {bike.name}
                          </p>
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
                    <td className="px-5 py-3">
                      <span
                        className={
                          bike.stock <= 0
                            ? 'text-destructive'
                            : bike.stock <= 3
                              ? 'text-primary'
                              : 'text-foreground'
                        }
                      >
                        {bike.stock} u.
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Editar ${bike.name}`}
                          onClick={() => openEdit(bike)}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          aria-label={`Eliminar ${bike.name}`}
                          onClick={() => setDeleting(bike)}
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
            <div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
              <Package className="size-8 text-muted-foreground" />
              <p className="font-medium">No hay bicicletas cargadas</p>
              <p className="text-sm text-muted-foreground">
                Agregá tu primer modelo al catálogo.
              </p>
            </div>
          )}
        </div>
      </div>

      <BikeForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
        initialBike={editing}
      />

      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title="Eliminar bicicleta"
        description={
          deleting
            ? `¿Seguro que querés eliminar "${deleting.name}"? Esta acción no se puede deshacer.`
            : undefined
        }
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleting(null)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (deleting) onDelete(deleting.id)
              setDeleting(null)
            }}
          >
            <Trash2 data-icon="inline-start" />
            Eliminar
          </Button>
        </div>
      </Modal>
    </section>
  )
}
