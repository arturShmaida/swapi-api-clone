import { BaseImageEntity } from 'src/common/entities/base-image.entity';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Image extends BaseImageEntity {
  @Column()
  name:string
  
  @ManyToOne(() => People, (people) => people.images)
  people: People | null;

  @ManyToOne(() => Film, (film) => film.images)
  films: Film| null;

  @ManyToOne(() => Planet, (planet) => planet.images)
  planets: Planet | null ;

  @ManyToOne(() => Species, (species) => species.images)
  species: Species | null;

  @ManyToOne(() => Starship, (starship) => starship.images)
  starships: Starship | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
  vehicles: Vehicle | null;
}
