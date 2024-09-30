interface Evento {
  id: number
  nome: string
  tipo: string
  email: string
  telefone?: string
  local_id: number
  data_inicio: Date
  data_fim: Date
  Local: Local
}

interface Local {
  id: number
  nome: string
  tipo: string
  endereco: string
  cidade: string
  uf: string
  cep: string
  email: string
  atualizacao: Date
  apelido?: string
  cnpj?: string
  complemento?: string
  catracas?: string[]
  entradas?: string[]
  telefone?: string
}

export type { Evento, Local }
