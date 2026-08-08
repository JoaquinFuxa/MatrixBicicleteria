'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { type Bike, type Category, BRANDS, CATEGORIES } from '@/lib/bikes'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'

export type BikeFormValues = Omit<Bike, 'id'>

const IMAGE_OPTIONS = [
  { label: 'Montaña — Trail', value: '/bikes/mtb-trail.png' },
  { label: 'Montaña — Carbono', value: '/bikes/mtb-carbon.png' },
  { label: 'Ruta — Velocity', value: '/bikes/road-velocity.png' },
  { label: 'Ruta — Aero', value: '/bikes/road-aero.png' },
  { label: 'Urbana — Glide', value: '/bikes/urban-glide.png' },
  { label: 'Eléctrica — Volt', value: '/bikes/ebike-volt.png' },
]

const fieldClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30'

const EMPTY: BikeFormValues = {
  name: '',
  brand: 'MATRIX',
  category: 'Montaña',
  price: 0,
  image: IMAGE_OPTIONS[0].value,
  stock: 0,
  description: '',
}

type BikeFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: BikeFormValues) => void
  initialBike?: Bike | null
}

export function BikeForm({ open, onClose, onSubmit, initialBike }: BikeFormProps) {
  const [values, setValues] = useState<BikeFormValues>(EMPTY)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUploadError(null)
      setValues(
        initialBike
          ? {
              name: initialBike.name,
              brand: initialBike.brand,
              category: initialBike.category,
              price: initialBike.price,
              image: initialBike.image,
              stock: initialBike.stock,
              description: initialBike.description ?? '',
              specs: initialBike.specs,
            }
          : EMPTY,
      )
    }
  }, [open, initialBike])

  function update<K extends keyof BikeFormValues>(key: K, value: BikeFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadError('El archivo debe ser una imagen.')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadError('La imagen no puede superar los 4 MB.')
      return
    }
    setUploadError(null)
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        update('image', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit({ ...values, name: values.name.trim() })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialBike ? 'Editar bicicleta' : 'Agregar nueva bicicleta'}
      description="Completá los datos del modelo para el catálogo."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bike-name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="bike-name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Ej. Trail Blazer X"
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bike-brand" className="text-sm font-medium">
              Marca
            </label>
            <select
              id="bike-brand"
              value={values.brand}
              onChange={(e) => update('brand', e.target.value)}
              className={fieldClass}
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bike-category" className="text-sm font-medium">
              Categoría
            </label>
            <select
              id="bike-category"
              value={values.category}
              onChange={(e) => update('category', e.target.value as Category)}
              className={fieldClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bike-price" className="text-sm font-medium">
              Precio (USD)
            </label>
            <input
              id="bike-price"
              type="number"
              min={0}
              step={1}
              required
              value={values.price === 0 ? '' : values.price}
              onChange={(e) => update('price', Number(e.target.value))}
              placeholder="0"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bike-stock" className="text-sm font-medium">
              Stock
            </label>
            <input
              id="bike-stock"
              type="number"
              min={0}
              step={1}
              required
              value={values.stock === 0 ? '' : values.stock}
              onChange={(e) => update('stock', Number(e.target.value))}
              placeholder="0"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="bike-description" className="text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="bike-description"
            value={values.description ?? ''}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Contá las características y beneficios de esta bicicleta..."
            rows={3}
            className={`${fieldClass} h-auto resize-y py-2 leading-relaxed`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Imagen de la bicicleta</span>

          <div className="flex items-start gap-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
              <Image
                src={values.image || '/placeholder.svg'}
                alt="Vista previa"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <input
                ref={fileInputRef}
                id="bike-image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload data-icon="inline-start" />
                Cargar imagen
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG o WEBP. Máx. 4 MB. O elegí una imagen predeterminada:
              </p>
              <select
                aria-label="Imagen predeterminada"
                value={
                  IMAGE_OPTIONS.some((o) => o.value === values.image)
                    ? values.image
                    : ''
                }
                onChange={(e) => {
                  if (e.target.value) update('image', e.target.value)
                }}
                className={fieldClass}
              >
                <option value="">Imagen personalizada</option>
                {IMAGE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {uploadError && (
            <p className="text-xs text-destructive" role="alert">
              {uploadError}
            </p>
          )}
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialBike ? 'Guardar cambios' : 'Agregar bicicleta'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
