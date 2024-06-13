import { Film } from 'src/swapi/films/entities/film.entity';
import { People } from 'src/swapi/people/entities/people.entity';
import { Planet } from 'src/swapi/planets/entities/planet.entity';
import { Species } from 'src/swapi/species/entities/species.entity';
import { Starship } from 'src/swapi/starships/entities/starship.entity';
import { Vehicle } from 'src/swapi/vehicles/entities/vehicle.entity';
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
