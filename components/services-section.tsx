import { type Service } from '@/lib/services'
import { ServiceCard } from '@/components/service-card'

export function ServicesSection({
  services,
  onViewDetails,
  embedded = false,
}: {
  services: Service[]
  onViewDetails: (service: Service) => void
  embedded?: boolean
}) {
  return (
    <section
      id={embedded ? undefined : 'taller'}
      className={embedded ? '' : 'scroll-mt-16 border-b border-border'}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${embedded ? 'pb-16 lg:pb-24' : 'py-16 lg:py-24'}`}
      >
        {!embedded && (
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-primary">Taller</span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Servicios de taller
            </h2>
            <p className="max-w-xl text-muted-foreground text-pretty">
              Mantenimiento, reparaciones y armado. Solicitá tu turno o consultá
              tiempos y precios por WhatsApp.
            </p>
          </div>
        )}

        {embedded && (
          <div className="mb-8 flex flex-col gap-2">
            <h3 className="font-heading text-2xl font-bold tracking-tight">
              Servicios de taller
            </h3>
            <p className="text-sm text-muted-foreground">
              Mantenimiento, reparaciones y armado.
            </p>
          </div>
        )}

        <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${embedded ? '' : 'mt-10'}`}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
