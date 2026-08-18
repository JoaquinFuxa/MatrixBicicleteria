import { Clock, MapPin, Phone, Mail } from 'lucide-react'
import { CONTACT, GOOGLE_MAPS_EMBED_URL, buildWhatsAppLink } from '@/lib/site-config'

const INFO = [
  {
    icon: MapPin,
    title: 'Ubicación',
    lines: [CONTACT.address, CONTACT.city],
  },
  {
    icon: Clock,
    title: 'Horarios',
    lines: CONTACT.hours,
  },
  {
    icon: Phone,
    title: 'Teléfono',
    lines: [CONTACT.phone],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [CONTACT.email],
  },
]

const SOCIALS = [
  { name: 'Instagram', src: '/social/instagram.svg', href: '#' },
  { name: 'Facebook', src: '/social/facebook.svg', href: '#' },
  {
    name: 'WhatsApp',
    src: '/social/whatsapp.svg',
    href: buildWhatsAppLink('¡Hola MATRIX! Quiero hacer una consulta.'),
  },
  { name: 'Strava', src: '/social/strava.svg', href: '#' },
]

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-primary">Contacto</span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Visitá nuestro local
          </h2>
          <p className="max-w-xl text-muted-foreground text-pretty">
            Estamos en Córdoba Capital. Vení a conocernos o escribinos por
            WhatsApp para consultas y turnos de taller.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <iframe
              title="Ubicación MATRIX Bicicletería"
              src={GOOGLE_MAPS_EMBED_URL}
              className="h-[320px] w-full border-0 sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {INFO.map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">Seguinos</p>
              <div className="mt-3 flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.name === 'WhatsApp' ? '_blank' : undefined}
                    rel={s.name === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    aria-label={s.name}
                    className="flex size-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:border-primary"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt="" className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
