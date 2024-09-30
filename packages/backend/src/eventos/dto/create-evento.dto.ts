import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tipo: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  telefone?: string

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  local_id: number

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  data_inicio: Date

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  data_fim: Date
}
