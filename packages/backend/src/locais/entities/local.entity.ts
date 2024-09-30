import { Local } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
export class LocalEntity implements Local {
  @ApiProperty()
  id: number
  @ApiProperty()
  nome: string
  @ApiProperty()
  tipo: string
  @ApiProperty()
  endereco: string
  @ApiProperty()
  cidade: string
  @ApiProperty()
  uf: string
  @ApiProperty()
  cep: string
  @ApiProperty()
  email: string
  @ApiProperty()
  atualizacao: Date
  @ApiProperty({ required: false })
  apelido: string | null
  @ApiProperty({ required: false })
  cnpj: string | null
  @ApiProperty({ required: false })
  complemento: string | null
  @ApiProperty({ required: false })
  catracas: string[] | null
  @ApiProperty({ required: false })
  entradas: string[] | null
  @ApiProperty({ required: false })
  telefone: string | null
}
