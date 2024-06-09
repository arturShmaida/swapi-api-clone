import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { People } from 'src/people/entities/people.entity';
import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
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
    StorageModule
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule { }
