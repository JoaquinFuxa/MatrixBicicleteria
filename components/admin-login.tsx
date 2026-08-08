'use client'

import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'

const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = 'admin'

const fieldClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/30'

export function AdminLogin({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (open) {
      setUser('')
      setPassword('')
      setError(false)
    }
  }, [open])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (user.trim() === ADMIN_USER && password === ADMIN_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Acceso administrador"
      description="Ingresá tus credenciales para gestionar el catálogo."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="admin-user" className="text-sm font-medium">
            Usuario
          </label>
          <input
            id="admin-user"
            autoComplete="username"
            required
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              setError(false)
            }}
            placeholder="admin"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="admin-password" className="text-sm font-medium">
            Contraseña
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="••••••"
            className={fieldClass}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            Usuario o contraseña incorrectos.
          </p>
        )}

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            <Lock data-icon="inline-start" />
            Ingresar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
