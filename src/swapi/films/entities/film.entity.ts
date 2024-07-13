import { BaseEntity } from '../../../common/entities/base.entity';
import { People } from '../../people/entities/people.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Species } from '../../species/entities/species.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Image } from '../../../images/entities/image.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Film extends BaseEntity {
  @Column()
  @ApiProperty({ example: 'A New Hope', description: 'Film title' })
  title: string;

  @Column()
  @ApiProperty({ example: '4', description: 'Film episode number' })
  episode_id: number;

  @Column({ type: 'mediumtext' })
  @ApiProperty({
    example: 'War.. war never changes',
    description: 'Film opening crawl',
  })
  opening_crawl: string;

  @Column()
  @ApiProperty({ example: 'George Lucas', description: 'Film director' })
  director: string;

  @Column()
  @ApiProperty({ example: 'Gary Kurtz', description: 'Film producer' })
  producer: string;

  @Column()
  @ApiProperty({ example: '1977-05-25', description: 'Film release date' })
  release_date: string;

  @ApiProperty({
    isArray: true,
    type: () => People,
    description: 'Film characters',
  })
  @ManyToMany(() => People, (People) => People.films, {
    onDelete: 'CASCADE',
  })
  characters: People[];

  @ApiProperty({
    isArray: true,
    type: () => Planet,
    description: 'Film planets',
  })
  @ManyToMany(() => Planet, (Planet) => Planet.films, { onDelete: 'CASCADE' })
  @JoinTable()
  planets: Planet[];

  @ApiProperty({
    isArray: true,
    type: () => Starship,
    description: 'Film starships',
  })
  @ManyToMany(() => Starship, (Starship) => Starship.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  starships: Starship[];

  @ApiProperty({
    isArray: true,
    type: () => Vehicle,
    description: 'Film vehicles',
  })
  @ManyToMany(() => Vehicle, (Vehicle) => Vehicle.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  vehicles: Vehicle[];

  @ApiProperty({
    isArray: true,
    type: () => Species,
    description: 'Film species',
  })
  @ManyToMany(() => Species, (Species) => Species.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  species: Species[];

  @ApiProperty({
    isArray: true,
    type: () => Image,
    description: 'Film images',
  })
  @OneToMany(() => Image, (Image) => Image.films)
  images: Image[];
}
