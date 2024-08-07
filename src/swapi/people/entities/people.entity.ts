import { BaseEntity } from '../../../common/entities/base.entity';
import { Film } from '../../films/entities/film.entity';
import { Image } from '../../../images/entities/image.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Species } from '../../species/entities/species.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class People extends BaseEntity {
  @Column()
  name: string;
  @Column()
  height: string;
  @Column()
  mass: string;
  @Column()
  hair_color: string;
  @Column()
  skin_color: string;
  @Column()
  eye_color: string;
  @Column()
  birth_year: string;
  @Column()
  gender: string;

  @ManyToOne(() => Planet, (Planet) => Planet, { nullable: true })
  homeworld: Planet;

  @ManyToMany(() => Film, (Film) => Film.characters)
  @JoinTable()
  films: Film[];

  @ManyToMany(() => Species, (Species) => Species.people)
  @JoinTable()
  species: Species[];

  @ManyToMany(() => Vehicle, (Vehicle) => Vehicle.pilots)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany(() => Starship, (Starship) => Starship.pilots)
  @JoinTable()
  starships: Starship[];

  @OneToMany(() => Image, (image) => image.people)
  images: Image[];
}
