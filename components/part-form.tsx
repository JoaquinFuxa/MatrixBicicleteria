'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import {
  type Part,
  type PartCategory,
  PART_CATEGORIES,
} from '@/lib/parts'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'

export type PartFormValues = Omit<Part, 'id'>

const fieldClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30'

const EMPTY: PartFormValues = {
  name: '',
  category: 'Frenos',
  price: 0,
  stock: 0,
  image: '/placeholder.svg',
}

type PartFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: PartFormValues) => void
  initialPart?: Part | null
}

export function PartForm({ open, onClose, onSubmit, initialPart }: PartFormProps) {
  const [values, setValues] = useState<PartFormValues>(EMPTY)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUploadError(null)
      setValues(
        initialPart
          ? {
              name: initialPart.name,
              category: initialPart.category,
              price: initialPart.price,
              stock: initialPart.stock,
              image: initialPart.image,
            }
          : EMPTY,
      )
    }
  }, [open, initialPart])

  function update<K extends keyof PartFormValues>(key: K, value: PartFormValues[K]) {
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
      title={initialPart ? 'Editar repuesto' : 'Agregar repuesto'}
      description="Completá los datos del repuesto para el catálogo."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="part-name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="part-name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Ej. Pastillas de freno Shimano B01S"
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="part-category" className="text-sm font-medium">
              Categoría
            </label>
            <select
              id="part-category"
              value={values.category}
              onChange={(e) => update('category', e.target.value as PartCategory)}
              className={fieldClass}
            >
              {PART_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="part-price" className="text-sm font-medium">
              Precio (USD)
            </label>
            <input
              id="part-price"
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
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="part-stock" className="text-sm font-medium">
            Stock
          </label>
          <input
            id="part-stock"
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

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Imagen</span>
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
            {initialPart ? 'Guardar cambios' : 'Agregar repuesto'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
