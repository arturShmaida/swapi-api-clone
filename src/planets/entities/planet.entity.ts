import { BaseEntity } from 'src/common/entities/base.entity';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Image } from 'src/images/entities/image.entity';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Planet extends BaseEntity {
  @Column()
  name: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  @OneToMany(() => People, (People) => People.homeworld)
  residents: People[];

  @ManyToMany(() => Film, (Film) => Film.planets)
  films: Film[];

  @OneToMany(() => Image, (Image) => Image.planets)
  images: Image[];
}
