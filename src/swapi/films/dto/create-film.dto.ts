import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString, IsArray } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNumberString()
  episode_id: number;

  @ApiProperty()
  @IsString()
  opening_crawl: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  producer: string;

  @ApiProperty()
  @IsString()
  release_date: string;

  @ApiProperty()
  @IsArray()
  characters: string[];

  @ApiProperty()
  @IsArray()
  planets: string[];

  @ApiProperty()
  @IsArray()
  starships: string[];

  @ApiProperty()
  @IsArray()
  vehicles: string[];

  @ApiProperty()
  @IsArray()
  species: string[];
}
