interface Base {
  id: string
  nome: string
  tipo: string
  endereco: string
  email: string
  telefone: string
  entradas: string[]
}

interface Local extends Base {
  apelido: string
  cnpj: string
  complemento: string
  cidade: string
  uf: string
  cep: string
  atualizacao: string
  catracas: string[]
}

interface Evento extends Base {
  local: string
  data: string
  horario: string
}

const locais: Local[] = [
  {
    id: '1',
    nome: 'Morumbis',
    apelido: '',
    tipo: '',
    cnpj: '',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    complemento: '',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05001-200',
    catracas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    atualizacao: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '2',
    nome: 'Alianz Parque',
    apelido: '',
    tipo: '',
    cnpj: '',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    complemento: '',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05001-200',
    catracas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    atualizacao: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '3',
    nome: 'Neo Química Arena',
    apelido: '',
    tipo: '',
    cnpj: '',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    complemento: '',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05001-200',
    catracas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    atualizacao: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '4',
    nome: 'Neo Química Arena',
    apelido: '',
    tipo: '',
    cnpj: '',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    complemento: '',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05001-200',
    catracas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    atualizacao: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '5',
    nome: 'Neo Química Arena',
    apelido: '',
    tipo: '',
    cnpj: '',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    complemento: '',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05001-200',
    catracas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    atualizacao: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '6',
    nome: 'Neo Química Arena',
    apelido: '',
    tipo: '',
    cnpj: '',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    complemento: '',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '05001-200',
    catracas: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    atualizacao: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
]

const eventos: Evento[] = [
  {
    id: '1',
    nome: 'Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    horario: '21:00',
    data: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '2',
    nome: 'Semi Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    horario: '21:00',
    data: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '3',
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    horario: '21:00',
    data: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '4',
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    horario: '21:00',
    data: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '5',
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    horario: '21:00',
    data: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
  {
    id: '6',
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    entradas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    horario: '21:00',
    data: '05/10/23',
    email: 'hello@gmail.com',
    telefone: '1199999999',
  },
]

export type { Local, Evento }
export function getPlaceholder() {
  return { locais, eventos }
}
export function getPlaceholderItem(id: string, tipo: 'local' | 'evento') {
  return tipo === 'local'
    ? locais.find((local) => local.id === id)
    : eventos.find((evento) => evento.id === id)
}
