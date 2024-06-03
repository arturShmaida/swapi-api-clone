import { BaseEntity } from 'src/common/entities/base.entity';
import { Film } from 'src/films/entities/film.entity';
import { Image } from 'src/images/entities/image.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
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
