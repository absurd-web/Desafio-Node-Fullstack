import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { LocaisModule } from './locais/locais.module';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [PrismaModule, LocaisModule, EventosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
