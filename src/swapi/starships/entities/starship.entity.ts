import { BaseEntity } from 'src/common/entities/base.entity';
import { Film } from '../../films/entities/film.entity';
import { Image } from 'src/images/entities/image.entity';
import { People } from '../../people/entities/people.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Starship extends BaseEntity {
  @Column()
  name: string;
  @Column()
  model: string;
  @Column()
  manufacturer: string;
  @Column()
  cost_in_credits: string;
  @Column()
  length: string;
  @Column()
  max_atmosphering_speed: string;
  @Column()
  crew: string;
  @Column()
  passengers: string;
  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

  @Column()
  starship_class: string;

  @ManyToMany(() => People, (People) => People.starships)
  pilots: People[];

  @ManyToMany(() => Film, (Film) => Film.starships)
  films: Film[];

  @OneToMany(() => Image, (Image) => Image.starships)
  images: Image[];
}
