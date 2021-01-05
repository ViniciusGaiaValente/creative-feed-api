import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("Creative Feed API")
    .setDescription("API for project 'creative-feed'")
    .setVersion("1.0")
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("internal/api", app, document);
}

bootstrap();