import { buildWhatsAppLink } from '@/lib/site-config'

export type PartCategory =
  | 'Frenos'
  | 'Cubiertas'
  | 'Cadenas'
  | 'Cámaras'
  | 'Accesorios'
  | 'Transmisión'

export const PART_CATEGORIES: PartCategory[] = [
  'Frenos',
  'Cubiertas',
  'Cadenas',
  'Cámaras',
  'Accesorios',
  'Transmisión',
]

export type Part = {
  id: string
  name: string
  category: PartCategory
  price: number
  stock: number
  image: string
}

export function buildPartWhatsAppUrl(part: Part): string {
  const stockLabel =
    part.stock <= 0 ? 'sin stock' : `${part.stock} unidad${part.stock === 1 ? '' : 'es'} disponible${part.stock === 1 ? '' : 's'}`
  const message = `¡Hola MATRIX! Quiero consultar por el repuesto *${part.name}* (${part.category}, ${formatPrice(part.price)}, ${stockLabel}). ¿Me podrían dar más información?`
  return buildWhatsAppLink(message)
}

export const INITIAL_PARTS: Part[] = [
  {
    id: 'p1',
    name: 'Pastillas de freno Shimano B01S',
    category: 'Frenos',
    price: 18,
    stock: 24,
    image: '/placeholder.svg',
  },
  {
    id: 'p2',
    name: 'Disco de freno 180mm',
    category: 'Frenos',
    price: 32,
    stock: 12,
    image: '/placeholder.svg',
  },
  {
    id: 'p3',
    name: 'Cubierta MTB 29" x 2.25',
    category: 'Cubiertas',
    price: 45,
    stock: 18,
    image: '/placeholder.svg',
  },
  {
    id: 'p4',
    name: 'Cubierta urbana 700x35',
    category: 'Cubiertas',
    price: 28,
    stock: 0,
    image: '/placeholder.svg',
  },
  {
    id: 'p5',
    name: 'Cadena Shimano HG71 8v',
    category: 'Cadenas',
    price: 22,
    stock: 30,
    image: '/placeholder.svg',
  },
  {
    id: 'p6',
    name: 'Cadena SRAM GX Eagle 12v',
    category: 'Cadenas',
    price: 55,
    stock: 6,
    image: '/placeholder.svg',
  },
  {
    id: 'p7',
    name: 'Cámara 29" válvula Presta',
    category: 'Cámaras',
    price: 12,
    stock: 40,
    image: '/placeholder.svg',
  },
  {
    id: 'p8',
    name: 'Cámara 700c válvula Schrader',
    category: 'Cámaras',
    price: 10,
    stock: 35,
    image: '/placeholder.svg',
  },
  {
    id: 'p9',
    name: 'Luces LED delantera + trasera',
    category: 'Accesorios',
    price: 35,
    stock: 15,
    image: '/placeholder.svg',
  },
  {
    id: 'p10',
    name: 'Portabidon aluminio',
    category: 'Accesorios',
    price: 8,
    stock: 50,
    image: '/placeholder.svg',
  },
  {
    id: 'p11',
    name: 'Cassette Shimano 11-34 9v',
    category: 'Transmisión',
    price: 48,
    stock: 8,
    image: '/placeholder.svg',
  },
  {
    id: 'p12',
    name: 'Desviador delantero Deore',
    category: 'Transmisión',
    price: 38,
    stock: 4,
    image: '/placeholder.svg',
  },
]

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
