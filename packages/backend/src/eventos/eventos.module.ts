import { Module } from '@nestjs/common'
import { EventosService } from './eventos.service'
import { EventosController } from './eventos.controller'
import { PrismaModule } from 'nestjs-prisma'

@Module({
  controllers: [EventosController],
  providers: [EventosService],
  imports: [PrismaModule],
})
export class EventosModule {}
