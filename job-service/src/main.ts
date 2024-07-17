import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle('Job Api')
    .setDescription('This API provides endpoints for submitting images and creating jobs and can also view existing jobs if they are authenticated. Users need to be logged in to submit and view jobs.')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('job',app,document);
  await app.listen(3000);
}
bootstrap();
