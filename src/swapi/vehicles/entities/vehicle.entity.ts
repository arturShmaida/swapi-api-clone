import { BaseEntity } from '../../../common/entities/base.entity';
import { Film } from '../../films/entities/film.entity';
import { Image } from '../../../images/entities/image.entity';
import { People } from '../../people/entities/people.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Vehicle extends BaseEntity {
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
  vehicle_class: string;

  @ManyToMany(() => People, (People) => People.vehicles)
  pilots: People[];

  @ManyToMany(() => Film, (Film) => Film.vehicles)
  films: Film[];

  @OneToMany(() => Image, (Image) => Image.vehicles)
  images: Image[];
}
