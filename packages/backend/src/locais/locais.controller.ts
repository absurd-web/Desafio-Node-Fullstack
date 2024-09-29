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
import { LocaisService } from './locais.service'
import { CreateLocalDto } from './dto/create-local.dto'
import { UpdateLocalDto } from './dto/update-local.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LocalEntity } from './entities/local.entity'

@Controller('locais')
@ApiTags('Locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Post()
  @ApiCreatedResponse({ type: LocalEntity })
  create(@Body() createLocalDto: CreateLocalDto) {
    return this.locaisService.create(createLocalDto)
  }

  @Get()
  @ApiOkResponse({ type: LocalEntity, isArray: true })
  findAll() {
    return this.locaisService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: LocalEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.locaisService.findOne(id)
  }

  @Patch(':id')
  @ApiOkResponse({ type: LocalEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocalDto: UpdateLocalDto
  ) {
    return this.locaisService.update(id, updateLocalDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: LocalEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.locaisService.remove(id)
  }
}
