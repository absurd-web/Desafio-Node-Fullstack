import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('Desafio Ingressos')
    .setDescription('A API para o desafio')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter.getInstance())
  )

  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.$on('query', (event) => {
    console.log(event)
  })

  await app.listen(3000)
}
bootstrap()
