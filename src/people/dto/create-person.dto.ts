import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString, IsOptional, IsArray } from 'class-validator';

export class CreatePeopleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumberString()
  height: string;

  @ApiProperty()
  @IsNumberString()
  mass: string;

  @ApiProperty()
  @IsString()
  hair_color: string;

  @ApiProperty()
  @IsString()
  skin_color: string;

  @ApiProperty()
  @IsString()
  eye_color: string;

  @ApiProperty()
  @IsString()
  birth_year: string;

  @ApiProperty({ enum: ['Male', 'Female,n/a'] })
  @IsString()
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  homeworld: string | null;

  @ApiProperty()
  @IsArray()
  films: number[];

  @ApiProperty()
  @IsArray()
  species: number[];

  @ApiProperty()
  @IsArray()
  vehicles: number[];

  @ApiProperty()
  @IsArray()
  //TODO: Add checking of the the array
  starships: number[];
}
