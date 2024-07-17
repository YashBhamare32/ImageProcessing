import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
  .setTitle('Authentication Api')
  .setDescription('This API provides endpoints for user authentication. Users can sign up, log in. The API uses JWT authentication for securing the endpoints.')
  .setVersion('1.0')
  .build()

const document = SwaggerModule.createDocument(app,config)
SwaggerModule.setup('auth',app,document);
  await app.listen(3001);
}
bootstrap();
