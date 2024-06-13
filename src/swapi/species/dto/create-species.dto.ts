import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateSpeciesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  classification: string;

  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  @IsString()
  average_height: string;

  @ApiProperty()
  @IsString()
  skin_colors: string;

  @ApiProperty()
  @IsString()
  hair_colors: string;

  @ApiProperty()
  @IsString()
  eye_colors: string;

  @ApiProperty()
  @IsString()
  average_lifespan: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  homeworld: number;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsArray()
  people: number[];

  @ApiProperty()
  @IsArray()
  films: number[];
}
