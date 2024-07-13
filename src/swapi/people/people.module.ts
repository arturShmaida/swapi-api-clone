import { Module, forwardRef } from '@nestjs/common';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PeopleController from './people.controller';
import { People } from './entities/people.entity';
import { Image } from '../../images/entities/image.entity';
import { CommonService } from '../../common/common.service';
import { CommonModule } from '../../common/common.module';
import { FilmsModule } from '../films/films.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';


@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([People, Image]),
  ],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
