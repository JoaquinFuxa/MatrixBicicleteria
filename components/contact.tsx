'use client'

import { useState } from 'react'
import { Clock, MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SUBJECTS = ['Consulta general', 'Servicio técnico', 'Compras']

const INFO = [
  {
    icon: MapPin,
    title: 'Ubicación',
    lines: ['Av. del Ciclista 1234', 'Buenos Aires, Argentina'],
  },
  {
    icon: Clock,
    title: 'Horarios',
    lines: ['Lun a Vie: 9 a 19 hs', 'Sáb: 9 a 13 hs'],
  },
  {
    icon: Phone,
    title: 'Teléfono',
    lines: ['+54 11 5555-1234'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['hola@matrixbikes.com'],
  },
]

const SOCIALS = [
  { name: 'Instagram', src: '/social/instagram.svg', href: '#' },
  { name: 'Facebook', src: '/social/facebook.svg', href: '#' },
  { name: 'WhatsApp', src: '/social/whatsapp.svg', href: '#' },
  { name: 'Strava', src: '/social/strava.svg', href: '#' },
]

const fieldClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [subject, setSubject] = useState(SUBJECTS[0])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacto" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-primary">Contacto</span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Hablemos sobre tu próxima bici
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-12 text-primary" />
                <h3 className="mt-4 font-heading text-xl font-semibold">
                  ¡Mensaje enviado!
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Gracias por escribirnos. Nuestro equipo se pondrá en contacto
                  con vos a la brevedad.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Tu nombre"
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+54 11 ..."
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={fieldClass}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Contanos en qué te podemos ayudar..."
                    className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30"
                  />
                </div>

                <Button type="submit" size="lg" className="h-11 self-start px-6">
                  Enviar mensaje
                  <Send data-icon="inline-end" />
                </Button>
              </form>
            )}
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
