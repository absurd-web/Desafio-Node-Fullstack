import { ApiProperty } from '@nestjs/swagger'

export class CreateEventoDto {
  @ApiProperty()
  nome: string

  @ApiProperty()
  tipo: string

  @ApiProperty()
  email: string

  @ApiProperty({ required: false })
  telefone?: string

  @ApiProperty()
  local_id: number

  @ApiProperty()
  data_inicio: Date

  @ApiProperty()
  data_fim: Date
}
