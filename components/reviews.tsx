import { Star } from 'lucide-react'
import { AVERAGE_RATING, MOCK_REVIEWS } from '@/lib/reviews'
import { cn } from '@/lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4',
            i < rating
              ? 'fill-primary text-primary'
              : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  return (
    <section id="reseñas" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-primary">Opiniones</span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="max-w-xl text-muted-foreground text-pretty">
              Experiencias reales de ciclistas que confiaron en MATRIX para sus
              bicis y el taller.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-5 py-4 text-center sm:text-right">
            <p className="font-heading text-3xl font-bold text-primary tabular-nums">
              {AVERAGE_RATING.toFixed(1)}
            </p>
            <StarRating rating={Math.round(AVERAGE_RATING)} />
            <p className="mt-1 text-xs text-muted-foreground">
              basado en {MOCK_REVIEWS.length} reseñas
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground text-pretty">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <cite className="text-sm font-semibold not-italic">
                  {review.author}
                </cite>
                <time className="text-xs text-muted-foreground">
                  {review.date}
                </time>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
