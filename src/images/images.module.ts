import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { People } from 'src/swapi/people/entities/people.entity';
import { Film } from 'src/swapi/films/entities/film.entity';
import { Planet } from 'src/swapi/planets/entities/planet.entity';
import { Species } from 'src/swapi/species/entities/species.entity';
import { Starship } from 'src/swapi/starships/entities/starship.entity';
import { Vehicle } from 'src/swapi/vehicles/entities/vehicle.entity';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Planet,
      Film,
      Species,
      Starship,
      Vehicle,
      Image,
    ]),
    StorageModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
