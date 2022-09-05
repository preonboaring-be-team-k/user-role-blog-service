import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HttpException Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Response Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // class-validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('기업과제 - 웨인힐스벤처스')
        .setDescription('Wanted PreOnboarding - Team K')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'JWT Token',
            in: 'header',
          },
          'Access Token',
        )
        .build(),
    ),
  );
  await app.listen(3000);
}
bootstrap();
