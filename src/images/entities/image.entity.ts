import { BaseImageEntity } from '../../common/entities/base-image.entity';
import { Film } from '../../swapi/films/entities/film.entity';
import { People } from '../../swapi/people/entities/people.entity';
import { Planet } from '../../swapi/planets/entities/planet.entity';
import { Species } from '../../swapi/species/entities/species.entity';
import { Starship } from '../../swapi/starships/entities/starship.entity';
import { Vehicle } from '../../swapi/vehicles/entities/vehicle.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Image extends BaseImageEntity {
  @Column()
  name: string;

  @ManyToOne(() => People, (people) => people.images)
  people: People | null;

  @ManyToOne(() => Film, (film) => film.images)
  films: Film | null;

  @ManyToOne(() => Planet, (planet) => planet.images)
  planets: Planet | null;

  @ManyToOne(() => Species, (species) => species.images)
  species: Species | null;

  @ManyToOne(() => Starship, (starship) => starship.images)
  starships: Starship | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
  vehicles: Vehicle | null;
}
