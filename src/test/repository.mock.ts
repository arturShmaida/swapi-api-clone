import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../swapi/films/entities/film.entity';
import { People } from '../swapi/people/entities/people.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const repositoryMockups = {
  people: {
    provide: getRepositoryToken(People),
    useValue: {
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  },
  films: {
    provide: getRepositoryToken(Film),
    useValue: {
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  },
  planets: {
    provide: getRepositoryToken(Planet),
    useValue: {
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  },
  species: {
    provide: getRepositoryToken(Species),
    useValue: {
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  },
  Starship: {
    provide: getRepositoryToken(Starship),
    useValue: {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  },
  vehicle: {
    provide: getRepositoryToken(Vehicle),
    useValue: {
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  },
};
export const repositoryMockupsFactory = (entityClass: EntityClassOrSchema) => {
  return {
    provide: getRepositoryToken(entityClass),
    useValue: {
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    },
  };
};
