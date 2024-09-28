interface Base {
  id: number
  nome: string
  endereco: string
  portoes: string
}

interface Local extends Base {
  cidade_uf: string
  atualizacao: string
}

interface Evento extends Base {
  tipo: string
  local: string
  data: string
}

const locais: Local[] = [
  {
    id: 1,
    nome: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 2,
    nome: 'Alianz Parque',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 3,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 4,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 5,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 6,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
]

const eventos: Evento[] = [
  {
    id: 1,
    nome: 'Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 2,
    nome: 'Semi Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 3,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 4,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 5,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 6,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
]

export type { Local, Evento }
export function getPlaceholder() {
  return { locais, eventos }
}
