import { buildWhatsAppLink } from '@/lib/site-config'

export type Service = {
  id: string
  name: string
  description: string
  price: number | null
  priceMax?: number
  estimatedTime: string
  image: string
}

export function formatServicePrice(service: Service): string {
  if (service.price === null) return 'Consultar precio'
  if (service.priceMax !== undefined) {
    return `${formatPrice(service.price)} – ${formatPrice(service.priceMax)}`
  }
  return formatPrice(service.price)
}

export function buildServiceWhatsAppUrl(service: Service): string {
  const priceLabel = formatServicePrice(service)
  const message = `¡Hola MATRIX! Quiero solicitar el servicio de *${service.name}* (${priceLabel}, tiempo estimado: ${service.estimatedTime}). ¿Cuándo podría llevar la bici?`
  return buildWhatsAppLink(message)
}

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Mantenimiento general',
    description:
      'Limpieza completa, lubricación de transmisión, revisión de frenos y ajuste general de componentes.',
    price: 35,
    priceMax: 55,
    estimatedTime: '24–48 hs',
    image: '/placeholder.svg',
  },
  {
    id: 's2',
    name: 'Cambio de cubiertas',
    description:
      'Desmontaje e instalación de cubiertas y cámaras, con revisión de llantas y ajuste de presión.',
    price: 15,
    priceMax: 25,
    estimatedTime: '2–4 hs',
    image: '/placeholder.svg',
  },
  {
    id: 's3',
    name: 'Ajuste de cambios',
    description:
      'Calibración de desviadores delantero y trasero, alineación y ajuste fino de indexado.',
    price: 20,
    estimatedTime: '1–2 hs',
    image: '/placeholder.svg',
  },
  {
    id: 's4',
    name: 'Armado de bicicleta',
    description:
      'Ensamblado completo de bici en caja: cuadro, transmisión, frenos, ruedas y ajuste final.',
    price: 60,
    priceMax: 90,
    estimatedTime: '2–3 días',
    image: '/placeholder.svg',
  },
  {
    id: 's5',
    name: 'Service de frenos',
    description:
      'Purga de frenos hidráulicos o ajuste de frenos mecánicos, cambio de pastillas si es necesario.',
    price: 25,
    priceMax: 45,
    estimatedTime: '24 hs',
    image: '/placeholder.svg',
  },
  {
    id: 's6',
    name: 'Centrado de ruedas',
    description:
      'Corrección de deformaciones en llantas y ajuste de tensión de radios para rueda perfecta.',
    price: 18,
    estimatedTime: '2–4 hs',
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
