'use client'

import { useEffect, useState } from 'react'
import { Lock, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Landing', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Contacto', href: '#contacto' },
]

type NavbarProps = {
  isAdmin: boolean
  onToggleAdmin: () => void
}

export function Navbar({ isAdmin, onToggleAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="MATRIX inicio" className="flex items-center">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isAdmin ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleAdmin}
            className="hidden sm:inline-flex"
          >
            {isAdmin ? (
              <>
                <LogOut data-icon="inline-start" />
                Salir del Admin
              </>
            ) : (
              <>
                <Lock data-icon="inline-start" />
                Acceso Admin
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant={isAdmin ? 'default' : 'outline'}
              size="sm"
              className="mt-2 justify-start"
              onClick={() => {
                onToggleAdmin()
                setMobileOpen(false)
              }}
            >
              {isAdmin ? (
                <>
                  <LogOut data-icon="inline-start" />
                  Salir del Admin
                </>
              ) : (
                <>
                  <Lock data-icon="inline-start" />
                  Acceso Admin
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
