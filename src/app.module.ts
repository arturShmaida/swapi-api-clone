import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';
import { SwapiModule } from './swapi/swapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({ dest: './uploads/images' }),
    SwapiModule,
    ImagesModule,
    CommonModule,
    AuthModule,
    UserModule,
    StorageModule,
    SwapiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: "APP_GUARD",
    //   useClass: AuthGuard
    // },
    // {
    //   provide:"APP_GUARD",
    //   useClass: RolesGuard
    // }
  ],
})
export class AppModule {}
