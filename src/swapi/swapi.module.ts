import { Module, forwardRef } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    PeopleModule,
    PlanetsModule,
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
  ],
})
export class SwapiModule {}
