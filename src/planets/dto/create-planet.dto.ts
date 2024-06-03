import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  rotation_period: string;

  @ApiProperty()
  @IsString()
  orbital_period: string;

  @ApiProperty()
  @IsString()
  diameter: string;

  @ApiProperty()
  @IsString()
  climate: string;

  @ApiProperty()
  @IsString()
  gravity: string;

  @ApiProperty()
  @IsString()
  terrain: string;

  @ApiProperty()
  @IsString()
  surface_water: string;

  @ApiProperty()
  @IsString()
  population: string;

  @ApiProperty()
  @IsArray()
  residents: number[];

  @ApiProperty()
  @IsArray()
  films: number[];
}
