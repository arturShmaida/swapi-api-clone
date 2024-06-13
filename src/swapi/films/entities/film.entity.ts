import { BaseEntity } from 'src/common/entities/base.entity';
import { People } from '../../people/entities/people.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Species } from '../../species/entities/species.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Image } from 'src/images/entities/image.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Film extends BaseEntity {
  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column({ type: 'mediumtext' })
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @ManyToMany(() => People, (People) => People.films)
  characters: People[];

  @ManyToMany(() => Planet, (Planet) => Planet.films)
  @JoinTable()
  planets: Planet[];

  @ManyToMany(() => Starship, (Starship) => Starship.films)
  @JoinTable()
  starships: Starship[];

  @ManyToMany(() => Vehicle, (Vehicle) => Vehicle.films)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany(() => Species, (Species) => Species.films)
  @JoinTable()
  species: Species[];

  @OneToMany(() => Image, (Image) => Image.films)
  images: Image[];
}
