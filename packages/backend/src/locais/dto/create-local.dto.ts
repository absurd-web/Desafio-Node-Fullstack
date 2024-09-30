import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLocalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  apelido?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tipo: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  cnpj?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endereco: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  complemento: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cidade: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  uf: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cep: string

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ required: false })
  catracas: string[]

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ required: false })
  entradas: string[]

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  telefone: string
}
