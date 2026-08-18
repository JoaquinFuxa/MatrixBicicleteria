export const WHATSAPP_NUMBER = '5493513207202'

export const CONTACT = {
  address: 'Av. Colón 4820',
  city: 'Córdoba, Argentina',
  phone: '+54 351 756-9237',
  email: 'hola@matrixbikes.com',
  hours: ['Lun a Vie: 9 a 19 hs', 'Sáb: 9 a 13 hs'],
}

export const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Av.+Col%C3%B3n+4820,+C%C3%B3rdoba,+Argentina&hl=es&z=16&output=embed'

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
