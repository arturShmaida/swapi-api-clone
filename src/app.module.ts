import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { PlanetsModule } from './planets/planets.module';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { StorageModule } from './storage/storage.module';

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
        ...configService.get("database")
      }),
      inject: [ConfigService]
    }),
    MulterModule.register({ dest: './uploads/images' }),
    PeopleModule,
    ImagesModule,
    PlanetsModule,
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    CommonModule,
    AuthModule,
    UserModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "APP_FILTER",
      useClass: HttpExceptionFilter
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
export class AppModule { }
