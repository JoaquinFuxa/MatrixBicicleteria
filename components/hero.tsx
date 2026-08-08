import Image from 'next/image'
import { ArrowRight, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: 'Garantía oficial' },
  { icon: Wrench, label: 'Service técnico' },
  { icon: Truck, label: 'Envíos a todo el país' },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border pt-16"
    >
      {/* glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[140px]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="relative z-10 flex flex-col items-start">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Ciclismo urbano y de montaña
          </span>

          <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Dominá cada <span className="text-primary">terreno</span> con MATRIX
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Bicicletas de alta gama para la ciudad, la ruta y la montaña.
            Rendimiento, diseño y tecnología en cada pedalada.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#catalogo"
              className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-6 text-base')}
            >
              Ver Catálogo
              <ArrowRight data-icon="inline-end" />
            </a>
            <a
              href="#contacto"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'h-11 px-6 text-base',
              )}
            >
              Contactar
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/bikes/hero-bike.png"
              alt="Bicicleta de montaña de alta gama MATRIX en color negro con detalles en azul"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
