export type Review = {
  id: string
  author: string
  rating: number
  text: string
  date: string
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Martín G.',
    rating: 5,
    text: 'Excelente atención. Me asesoraron perfecto para elegir mi primera MTB y el armado quedó impecable. Muy recomendable.',
    date: '12 mar 2026',
  },
  {
    id: 'r2',
    author: 'Carolina L.',
    rating: 5,
    text: 'Llevé la bici por un service completo y la devolvieron en menos de 48 horas. Cambios afinados y frenos como nuevos.',
    date: '3 mar 2026',
  },
  {
    id: 'r3',
    author: 'Diego R.',
    rating: 4,
    text: 'Buenos precios en repuestos y cubiertas. Siempre tienen stock de lo más pedido. El local es chico pero muy ordenado.',
    date: '18 feb 2026',
  },
  {
    id: 'r4',
    author: 'Valentina M.',
    rating: 5,
    text: 'Me cambiaron las cubiertas en el momento y me explicaron cómo cuidar la presión. Trato cercano y profesional.',
    date: '5 feb 2026',
  },
  {
    id: 'r5',
    author: 'Lucas P.',
    rating: 5,
    text: 'Compré una bici urbana y me hicieron descuento en accesorios. Rapidez en el taller y honestidad con los tiempos de entrega.',
    date: '22 ene 2026',
  },
  {
    id: 'r6',
    author: 'Ana S.',
    rating: 4,
    text: 'Lugar de confianza para dejar la bici. Ya es la tercera vez que vengo y siempre salgo conforme con el trabajo.',
    date: '8 ene 2026',
  },
]

export const AVERAGE_RATING =
  MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length
