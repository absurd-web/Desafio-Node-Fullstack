import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const local1 = await prisma.local.upsert({
    where: { id: 1 },
    update: {},
    create: {
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
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const local2 = await prisma.local.upsert({
    where: { id: 2 },
    update: {},
    create: {
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
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const local3 = await prisma.local.upsert({
    where: { id: 3 },
    update: {},
    create: {
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
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const local4 = await prisma.local.upsert({
    where: { id: 4 },
    update: {},
    create: {
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
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const local5 = await prisma.local.upsert({
    where: { id: 5 },
    update: {},
    create: {
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
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const local6 = await prisma.local.upsert({
    where: { id: 6 },
    update: {},
    create: {
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
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const evento1 = await prisma.evento.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Final Copa América',
      tipo: 'Futebol',
      local_id: local1.id,
      data_inicio: new Date('2023-10-05'),
      data_fim: new Date('2023-10-08'),
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const evento2 = await prisma.evento.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Semi Final Copa América',
      tipo: 'Futebol',
      local_id: local1.id,
      data_inicio: new Date('2023-10-05'),
      data_fim: new Date('2023-10-08'),
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const evento3 = await prisma.evento.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: 'Love on tour - Harry Styles',
      tipo: 'Show',
      local_id: local1.id,
      data_inicio: new Date('2023-10-05'),
      data_fim: new Date('2023-10-08'),
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })
  const evento4 = await prisma.evento.upsert({
    where: { id: 4 },
    update: {},
    create: {
      nome: 'Love on tour - Harry Styles',
      tipo: 'Show',
      local_id: local1.id,
      data_inicio: new Date('2023-10-05'),
      data_fim: new Date('2023-10-08'),
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const evento5 = await prisma.evento.upsert({
    where: { id: 5 },
    update: {},
    create: {
      nome: 'Love on tour - Harry Styles',
      tipo: 'Show',
      local_id: local1.id,
      data_inicio: new Date('2023-10-05'),
      data_fim: new Date('2023-10-08'),
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  const evento6 = await prisma.evento.upsert({
    where: { id: 6 },
    update: {},
    create: {
      nome: 'Love on tour - Harry Styles',
      tipo: 'Show',
      local_id: local1.id,
      data_inicio: new Date('2023-10-05'),
      data_fim: new Date('2023-10-08'),
      email: 'hello@gmail.com',
      telefone: '1199999999',
    },
  })

  console.log({
    local1,
    local2,
    local3,
    local4,
    local5,
    local6,
    evento1,
    evento2,
    evento3,
    evento4,
    evento5,
    evento6,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
