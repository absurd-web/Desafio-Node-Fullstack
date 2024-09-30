import { Evento } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
export class EventoEntity implements Evento {
  @ApiProperty()
  id: number
  @ApiProperty()
  nome: string
  @ApiProperty()
  tipo: string
  @ApiProperty()
  email: string
  @ApiProperty({ required: false })
  telefone: string | null
  @ApiProperty()
  local_id: number
  @ApiProperty()
  data_inicio: Date
  @ApiProperty()
  data_fim: Date
}
