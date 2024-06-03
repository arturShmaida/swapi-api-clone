import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  cost_in_credits: string;

  @ApiProperty()
  @IsString()
  length: string;

  @ApiProperty()
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty()
  @IsString()
  crew: string;

  @ApiProperty()
  @IsString()
  passengers: string;

  @ApiProperty()
  @IsString()
  cargo_capacity: string;

  @ApiProperty()
  @IsString()
  consumables: string;

  @ApiProperty()
  @IsString()
  vehicle_class: string;

  @ApiProperty()
  @IsArray()
  pilots: number[];

  @ApiProperty()
  @IsArray()
  films: number[];
}
