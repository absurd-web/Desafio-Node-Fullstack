import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { EventosService } from './eventos.service'
import { CreateEventoDto } from './dto/create-evento.dto'
import { UpdateEventoDto } from './dto/update-evento.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { EventoEntity } from './entities/evento.entity'

@Controller('eventos')
@ApiTags('Eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @ApiCreatedResponse({ type: EventoEntity })
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto)
  }

  @Get()
  @ApiOkResponse({ type: EventoEntity, isArray: true })
  findAll() {
    return this.eventosService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: EventoEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.findOne(id)
  }

  @Patch(':id')
  @ApiOkResponse({ type: EventoEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventoDto: UpdateEventoDto
  ) {
    return this.eventosService.update(id, updateEventoDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: EventoEntity })
  remove(@Param('id') id: number) {
    return this.eventosService.remove(id)
  }
}
