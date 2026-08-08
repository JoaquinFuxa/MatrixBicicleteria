export type Category = 'Montaña' | 'Ruta' | 'Urbana' | 'Eléctrica'

export const CATEGORIES: Category[] = ['Montaña', 'Ruta', 'Urbana', 'Eléctrica']

export type BikeSpec = { label: string; value: string }

export type Bike = {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  image: string
  stock: number
  description?: string
  specs?: BikeSpec[]
  featured?: boolean
}

export const BRANDS = ['MATRIX', 'Trek', 'Specialized', 'Giant', 'Cannondale']

// Número de WhatsApp de la tienda (formato internacional, sin + ni espacios)
export const WHATSAPP_NUMBER = '5491122334455'

export function buildWhatsAppUrl(bike: Bike): string {
  const message = `¡Hola MATRIX! Estoy interesado/a en la bicicleta *${bike.brand} ${bike.name}* (${formatPrice(bike.price)}). ¿Podrían darme más información?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const INITIAL_BIKES: Bike[] = [
  {
    id: 'b1',
    name: 'Trail Blazer X',
    brand: 'MATRIX',
    category: 'Montaña',
    price: 2499,
    image: '/bikes/mtb-trail.png',
    stock: 8,
    featured: true,
    description:
      'La Trail Blazer X está diseñada para dominar los senderos más exigentes. Su suspensión total absorbe cada impacto para que puedas concentrarte en la línea perfecta, mientras que su geometría moderna ofrece control absoluto en descensos técnicos.',
    specs: [
      { label: 'Cuadro', value: 'Aluminio hidroformado' },
      { label: 'Suspensión', value: 'Doble, 140mm de recorrido' },
      { label: 'Transmisión', value: 'Shimano Deore 12v' },
      { label: 'Frenos', value: 'Disco hidráulico' },
      { label: 'Rodado', value: '29"' },
    ],
  },
  {
    id: 'b2',
    name: 'Summit Pro Carbon',
    brand: 'Specialized',
    category: 'Montaña',
    price: 3899,
    image: '/bikes/mtb-carbon.png',
    stock: 3,
    description:
      'Ligereza extrema y rigidez de competición en un cuadro de fibra de carbono. La Summit Pro Carbon es la elección de los riders que buscan velocidad en subida sin sacrificar solidez en el descenso.',
    specs: [
      { label: 'Cuadro', value: 'Fibra de carbono FACT 11m' },
      { label: 'Suspensión', value: 'Delantera, 120mm' },
      { label: 'Transmisión', value: 'SRAM GX Eagle 12v' },
      { label: 'Frenos', value: 'Disco hidráulico' },
      { label: 'Peso', value: '10,8 kg' },
    ],
  },
  {
    id: 'b3',
    name: 'Velocity R7',
    brand: 'MATRIX',
    category: 'Ruta',
    price: 2199,
    image: '/bikes/road-velocity.png',
    stock: 12,
    description:
      'Una bicicleta de ruta versátil y ágil, ideal tanto para tus salidas largas del fin de semana como para el entrenamiento diario. Comodidad y rendimiento en perfecto equilibrio.',
    specs: [
      { label: 'Cuadro', value: 'Aluminio con horquilla de carbono' },
      { label: 'Transmisión', value: 'Shimano 105 22v' },
      { label: 'Frenos', value: 'Disco hidráulico' },
      { label: 'Ruedas', value: 'Perfil 30mm' },
      { label: 'Peso', value: '8,9 kg' },
    ],
  },
  {
    id: 'b4',
    name: 'Aero Road Elite',
    brand: 'Trek',
    category: 'Ruta',
    price: 4299,
    image: '/bikes/road-aero.png',
    stock: 0,
    description:
      'Aerodinámica pura para quienes compiten contra el reloj. Cada tubo del cuadro fue optimizado en túnel de viento para reducir la resistencia y maximizar cada watt de potencia.',
    specs: [
      { label: 'Cuadro', value: 'Carbono aero de alto módulo' },
      { label: 'Transmisión', value: 'Shimano Ultegra Di2 24v' },
      { label: 'Frenos', value: 'Disco hidráulico' },
      { label: 'Ruedas', value: 'Perfil 50mm carbono' },
      { label: 'Peso', value: '7,8 kg' },
    ],
  },
  {
    id: 'b5',
    name: 'Urban Glide',
    brand: 'Giant',
    category: 'Urbana',
    price: 999,
    image: '/bikes/urban-glide.png',
    stock: 20,
    description:
      'La compañera ideal para la ciudad. Posición cómoda, mantenimiento mínimo y un diseño limpio que combina con tu estilo de vida urbano.',
    specs: [
      { label: 'Cuadro', value: 'Aluminio urbano' },
      { label: 'Transmisión', value: 'Shimano 8v' },
      { label: 'Frenos', value: 'Disco mecánico' },
      { label: 'Extras', value: 'Portaequipajes y guardabarros' },
      { label: 'Rodado', value: '28"' },
    ],
  },
  {
    id: 'b6',
    name: 'Volt E-City',
    brand: 'Cannondale',
    category: 'Eléctrica',
    price: 2799,
    image: '/bikes/ebike-volt.png',
    stock: 5,
    featured: true,
    description:
      'Pedaleá más lejos con menos esfuerzo. El motor eléctrico integrado de la Volt E-City te asiste en cada trayecto, con una batería de gran autonomía escondida en el cuadro.',
    specs: [
      { label: 'Motor', value: 'Central 250W' },
      { label: 'Batería', value: '500Wh integrada' },
      { label: 'Autonomía', value: 'Hasta 100 km' },
      { label: 'Transmisión', value: 'Shimano 9v' },
      { label: 'Frenos', value: 'Disco hidráulico' },
    ],
  },
]

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
