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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService)=>({
        ...configService.get("database")
      }),
      inject:[ConfigService]
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
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
