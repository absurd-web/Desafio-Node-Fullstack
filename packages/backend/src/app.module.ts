import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LocaisModule } from './locais/locais.module'
import { EventosModule } from './eventos/eventos.module'
import { PrismaModule, providePrismaClientExceptionFilter } from 'nestjs-prisma'

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
          ],
        },
      },
    }),
    LocaisModule,
    EventosModule,
  ],
  controllers: [AppController],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
