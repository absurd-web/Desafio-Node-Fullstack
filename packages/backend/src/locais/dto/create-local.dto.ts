import { ApiProperty } from '@nestjs/swagger'

export class CreateLocalDto {
  @ApiProperty()
  nome: string

  @ApiProperty({ required: false })
  apelido?: string

  @ApiProperty()
  tipo: string

  @ApiProperty({ required: false })
  cnpj?: string

  @ApiProperty()
  endereco: string

  @ApiProperty({ required: false })
  complemento: string

  @ApiProperty()
  cidade: string

  @ApiProperty()
  uf: string

  @ApiProperty()
  cep: string

  @ApiProperty({ required: false })
  catracas: string[]

  @ApiProperty({ required: false })
  entradas: string[]

  @ApiProperty()
  email: string

  @ApiProperty({ required: false })
  telefone: string
}
