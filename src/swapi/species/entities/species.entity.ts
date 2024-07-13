import { BaseEntity } from '../../../common/entities/base.entity';
import { Film } from '../../films/entities/film.entity';
import { Image } from '../../../images/entities/image.entity';
import { People } from '../../people/entities/people.entity';
import { Planet } from '../../planets/entities/planet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Species extends BaseEntity {
  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: string;

  @OneToOne(() => Planet, { nullable: true })
  @JoinColumn()
  homeworld: Planet;

  @Column()
  language: string;

  @ManyToMany(() => People, (People) => People.species)
  people: People[];

  @ManyToMany(() => Film, (Film) => Film.species)
  films: Film[];

  @OneToMany(() => Image, (Image) => Image.species)
  images: Image[];
}
