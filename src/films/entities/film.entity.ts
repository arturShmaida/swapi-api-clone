import { BaseEntity } from 'src/common/entities/base.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
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
