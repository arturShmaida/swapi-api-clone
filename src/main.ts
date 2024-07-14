import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalTransformInterceptor } from './common/intrceptors/global-response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exception-filters/global-exception.filter';
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError, useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('port');
  app.enableCors();
  app.use(morgan('dev'));
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useGlobalInterceptors(new GlobalTransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorMessage = validationErrors
          .map((error) => {
            return `${error.property} has wrong value ${
              error.value
            } ${Object.values(error.constraints).join(', ')}`;
          })
          .join(', ');
        return new UnprocessableEntityException(errorMessage);
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SWAPI')
    .setDescription('The Star Wars API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
