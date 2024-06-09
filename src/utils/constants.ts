import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';

export const DEFAULT_PAGE_LIMIT = 10;
export const IMAGE_URL_TIME_TO_LIVE = 3600;
export enum entities {
  people = 'people',
  films = 'films',
  planets = 'planets',
  species = 'species',
  starships = 'starships',
  vehicles = 'vehicles',
}
export type EntityTypeUnion =
  | People
  | Starship
  | Film
  | Vehicle
  | Species
  | Planet;
export type RepositoryTypeUnion = Repository<EntityTypeUnion>;
export type TypeKeys = keyof typeof entities;
export const SWAPI_FETCH_URL = 'https://swapi.info/api/';

