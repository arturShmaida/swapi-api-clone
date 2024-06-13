import { BaseImageEntity } from 'src/common/entities/base-image.entity';
import { Film } from 'src/swapi/films/entities/film.entity';
import { People } from 'src/swapi/people/entities/people.entity';
import { Planet } from 'src/swapi/planets/entities/planet.entity';
import { Species } from 'src/swapi/species/entities/species.entity';
import { Starship } from 'src/swapi/starships/entities/starship.entity';
import { Vehicle } from 'src/swapi/vehicles/entities/vehicle.entity';
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
