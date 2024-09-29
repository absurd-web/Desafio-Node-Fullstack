import { Evento } from './types'

export const getEventos = async () => {
  const response = await fetch('/api/eventos')
  if (!response.ok) throw new Error('Failed to fetch eventos')
  return response.json()
}

export const getEvento = async (id: number) => {
  const response = await fetch(`/api/eventos/${id}`)
  if (!response.ok) throw new Error('Failed to fetch local')
  return response.json()
}

export const createEvento = async (data: Omit<Evento, 'id'>) => {
  const response = await fetch('/api/eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to create local')
  return response.json()
}

export const updateEvento = async (id: number, data: Omit<Evento, 'id'>) => {
  const response = await fetch(`/api/eventos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update local')
  return response.json()
}

export const deleteEvento = async (id: number) => {
  const response = await fetch(`/api/eventos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete local')
  return response.json()
}
