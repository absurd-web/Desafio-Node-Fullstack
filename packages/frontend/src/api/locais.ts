import { Local } from './types'

export const getLocais = async () => {
  const response = await fetch('/api/locais')
  if (!response.ok) throw new Error('Failed to fetch locais')
  return response.json()
}

export const getLocal = async (id: number) => {
  const response = await fetch(`/api/locais/${id}`)
  if (!response.ok) throw new Error('Failed to fetch local')
  return response.json()
}

export const createLocal = async (data: Omit<Local, 'id'>) => {
  const response = await fetch('/api/locais', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to create local')
  return response.json()
}

export const updateLocal = async (id: number, data: Omit<Local, 'id'>) => {
  const response = await fetch(`/api/locais/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update local')
  return response.json()
}

export const deleteLocal = async (id: number) => {
  const response = await fetch(`/api/locais/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete local')
  return response.json()
}
