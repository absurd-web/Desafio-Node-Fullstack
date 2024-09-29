import { ConflictException, Injectable } from '@nestjs/common'
import { CreateEventoDto } from './dto/create-evento.dto'
import { UpdateEventoDto } from './dto/update-evento.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) {}

  async create(createEventoDto: CreateEventoDto) {
    await this.checkForOverlap(createEventoDto)
    return this.prisma.evento.create({ data: createEventoDto })
  }

  findAll() {
    return this.prisma.evento.findMany()
  }

  findOne(id: number) {
    return this.prisma.evento.findUnique({
      where: { id },
      include: { Local: true },
    })
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    await this.checkForOverlap(updateEventoDto, id)
    return this.prisma.evento.update({
      where: { id },
      data: updateEventoDto,
    })
  }

  remove(id: number) {
    return this.prisma.evento.delete({ where: { id } })
  }

  private async checkForOverlap(
    eventoDto: CreateEventoDto | UpdateEventoDto,
    excludeId?: number
  ) {
    const { local_id, data_inicio, data_fim } = eventoDto

    const overlappingEvento = await this.prisma.evento.findFirst({
      where: {
        local_id,
        id: { not: excludeId },
        OR: [
          {
            AND: [
              { data_inicio: { lte: data_inicio } },
              { data_fim: { gt: data_inicio } },
            ],
          },
          {
            AND: [
              { data_inicio: { lt: data_fim } },
              { data_fim: { gte: data_fim } },
            ],
          },
          {
            AND: [
              { data_inicio: { gte: data_inicio } },
              { data_fim: { lte: data_fim } },
            ],
          },
        ],
      },
    })

    if (overlappingEvento) {
      throw new ConflictException(
        'Esse evento ocorre ao mesmo tempo que outro evento no mesmo local.'
      )
    }
  }
}
