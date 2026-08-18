'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { type Service } from '@/lib/services'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'

export type ServiceFormValues = Omit<Service, 'id'>

const fieldClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30'

const EMPTY: ServiceFormValues = {
  name: '',
  description: '',
  price: null,
  priceMax: undefined,
  estimatedTime: '',
  image: '/placeholder.svg',
}

type ServiceFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: ServiceFormValues) => void
  initialService?: Service | null
}

export function ServiceForm({
  open,
  onClose,
  onSubmit,
  initialService,
}: ServiceFormProps) {
  const [values, setValues] = useState<ServiceFormValues>(EMPTY)
  const [priceMode, setPriceMode] = useState<'fixed' | 'range' | 'consult'>('fixed')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUploadError(null)
      if (initialService) {
        const mode =
          initialService.price === null
            ? 'consult'
            : initialService.priceMax !== undefined
              ? 'range'
              : 'fixed'
        setPriceMode(mode)
        setValues({
          name: initialService.name,
          description: initialService.description,
          price: initialService.price,
          priceMax: initialService.priceMax,
          estimatedTime: initialService.estimatedTime,
          image: initialService.image,
        })
      } else {
        setPriceMode('fixed')
        setValues(EMPTY)
      }
    }
  }, [open, initialService])

  function update<K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K],
  ) {
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

  function handlePriceModeChange(mode: 'fixed' | 'range' | 'consult') {
    setPriceMode(mode)
    if (mode === 'consult') {
      setValues((v) => ({ ...v, price: null, priceMax: undefined }))
    } else if (mode === 'fixed') {
      setValues((v) => ({ ...v, price: v.price ?? 0, priceMax: undefined }))
    } else {
      setValues((v) => ({
        ...v,
        price: v.price ?? 0,
        priceMax: v.priceMax ?? v.price ?? 0,
      }))
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const payload: ServiceFormValues = {
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
      estimatedTime: values.estimatedTime.trim(),
    }
    if (priceMode === 'consult') {
      payload.price = null
      payload.priceMax = undefined
    } else if (priceMode === 'fixed') {
      payload.priceMax = undefined
    }
    onSubmit(payload)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialService ? 'Editar servicio' : 'Agregar servicio'}
      description="Completá los datos del servicio de taller."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="service-name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="service-name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Ej. Mantenimiento general"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="service-description" className="text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="service-description"
            required
            value={values.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Describí brevemente qué incluye el servicio..."
            rows={3}
            className={`${fieldClass} h-auto resize-y py-2 leading-relaxed`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Precio</span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['fixed', 'Precio fijo'],
                ['range', 'Rango de precio'],
                ['consult', 'Consultar precio'],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => handlePriceModeChange(mode)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  priceMode === mode
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {priceMode === 'fixed' && (
            <input
              type="number"
              min={0}
              step={1}
              required
              value={values.price === null || values.price === 0 ? '' : values.price}
              onChange={(e) => update('price', Number(e.target.value))}
              placeholder="Precio en USD"
              className={fieldClass}
            />
          )}

          {priceMode === 'range' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service-price-min" className="text-xs text-muted-foreground">
                  Desde (USD)
                </label>
                <input
                  id="service-price-min"
                  type="number"
                  min={0}
                  step={1}
                  required
                  value={values.price === null || values.price === 0 ? '' : values.price}
                  onChange={(e) => update('price', Number(e.target.value))}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service-price-max" className="text-xs text-muted-foreground">
                  Hasta (USD)
                </label>
                <input
                  id="service-price-max"
                  type="number"
                  min={0}
                  step={1}
                  required
                  value={
                    values.priceMax === undefined || values.priceMax === 0
                      ? ''
                      : values.priceMax
                  }
                  onChange={(e) => update('priceMax', Number(e.target.value))}
                  className={fieldClass}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="service-time" className="text-sm font-medium">
            Tiempo estimado
          </label>
          <input
            id="service-time"
            required
            value={values.estimatedTime}
            onChange={(e) => update('estimatedTime', e.target.value)}
            placeholder="Ej. 24–48 hs"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Imagen representativa</span>
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
                JPG, PNG o WEBP. Máx. 4 MB. Si no cargás, se usa placeholder.
              </p>
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
            {initialService ? 'Guardar cambios' : 'Agregar servicio'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
