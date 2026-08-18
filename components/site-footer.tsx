import { Logo } from '@/components/logo'
import { CONTACT, buildWhatsAppLink } from '@/lib/site-config'

const QUICK_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Repuestos', href: '#repuestos' },
  { label: 'Taller', href: '#taller' },
  { label: 'Reseñas', href: '#reseñas' },
  { label: 'Contacto', href: '#contacto' },
]

const CATEGORY_LINKS = ['Montaña', 'Ruta', 'Urbana', 'Eléctrica']

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

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo className="h-40" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Bicicletas de alta gama para la ciudad y la montaña. Pasión por el
              ciclismo desde el primer pedaleo.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.name === 'WhatsApp' ? '_blank' : undefined}
                  rel={s.name === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  aria-label={s.name}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-primary"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt="" className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold">Navegación</p>
            <ul className="mt-4 flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold">Categorías</p>
            <ul className="mt-4 flex flex-col gap-2">
              {CATEGORY_LINKS.map((c) => (
                <li key={c}>
                  <a
                    href="#catalogo"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold">Contacto</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>{CONTACT.address}</li>
              <li>{CONTACT.city}</li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MATRIX Bicicletería. Todos los derechos
            reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado para ciclistas, por ciclistas.
          </p>
        </div>
      </div>
    </footer>
  )
}
