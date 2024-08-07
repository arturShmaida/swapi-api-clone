import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { ImageUploadDto } from './dto/ImageUploadDto';
import { Film } from '../swapi/films/entities/film.entity';
import { People } from '../swapi/people/entities/people.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { EntityTypeUnion, TypeKeys } from '../utils/constants';
import { StorageService } from '../storage/storage.service';
import { getUniqueName } from '../utils/utils';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(People)
    private peopleRepository: Repository<People>,

    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,

    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    private storageService: StorageService,
  ) {}

  async uploadImage(
    image: Express.Multer.File,
    imageUploadDto: ImageUploadDto,
  ) {
    const { assignToEntity, entityId } = imageUploadDto;

    const imageEntity = this.imageRepository.create();

    const lastImageArray = await this.imageRepository.find({
      take: 1,
      order: { id: 'desc' },
    });
    let newImageId: number;
    if (lastImageArray.length === 0) {
      newImageId = 1;
    } else {
      newImageId = lastImageArray[0].id + 1;
    }
    console.log(image);
    const uniqueName = getUniqueName(image);

    imageEntity.name = uniqueName;
    imageEntity.id = newImageId;

    try {
      const linkedImageEntity = await this.linkImageToEntity(
        assignToEntity,
        entityId,
        imageEntity,
      );
      const sendFileResponse = await this.storageService.sendFile(
        image,
        uniqueName,
      );
      console.log(sendFileResponse);
      return await this.imageRepository.save(linkedImageEntity);
    } catch (e: any) {
      console.log(e);
    }
  }

  async findAllRecords(): Promise<Image[]> {
    const imageEntities = await this.imageRepository.find();
    if (imageEntities.length === 0) {
      return [];
    }
    return this.storageService.getEnitiesWithSignedUrl(imageEntities);
  }

  async findOne(id: number): Promise<Image> {
    const imageEntity = await this.imageRepository.findOneBy({ id });
    if (!imageEntity) {
      throw new NotFoundException(`Image with id: ${id} is Not Found!`);
    }

    const entity = (
      await this.storageService.getEnitiesWithSignedUrl([imageEntity])
    )[0];
    return entity;
  }

  async removeImage(id: number) {
    const imageEntity = await this.imageRepository.findOneBy({ id });
    if (!imageEntity) {
      throw new NotFoundException(`Image with id: ${id} is Not Found!`);
    }
    const imageName = imageEntity.name;

    const success = await this.storageService.removeFile(imageName);

    if (success) {
      return this.imageRepository.remove(imageEntity);
    }

    throw new InternalServerErrorException(
      'Unexpected error while removinge image',
    );
  }

  async removeAllImages() {
    try {
      const allImages = await this.findAllRecords();
      for (const image of allImages) {
        await this.removeImage(image.id);
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Unexpected error while removing all images',
      );
    }
  }

  private async linkImageToEntity(
    assignToEntity: TypeKeys,
    entityId: number,
    imageEntity: Image,
  ) {
    let hostEntity: EntityTypeUnion;

    const query: FindOneOptions<EntityTypeUnion> = {
      where: { id: entityId },
      relations: ['images'],
      select: ['images'],
    };
    switch (assignToEntity) {
      case 'people': {
        hostEntity = await this.peopleRepository.findOne(query);
        imageEntity.people = hostEntity;
        break;
      }
      case 'films': {
        hostEntity = await this.filmsRepository.findOne(query);
        imageEntity.films = hostEntity;
        break;
      }
      case 'planets': {
        hostEntity = await this.planetsRepository.findOne(query);
        imageEntity.planets = hostEntity;
        break;
      }
      case 'species': {
        hostEntity = await this.speciesRepository.findOne(query);
        imageEntity.species = hostEntity;
        break;
      }
      case 'starships': {
        hostEntity = await this.starshipRepository.findOne(query);
        imageEntity.starships = hostEntity;
        break;
      }
      case 'vehicles': {
        hostEntity = await this.vehicleRepository.findOne(query);
        imageEntity.vehicles = hostEntity;
        break;
      }
    }
    if (hostEntity === null) {
      throw new NotFoundException(
        `The ${assignToEntity} entity with id: ${entityId} is Not Found! Image can't be upload without assigned entity`,
      );
    }
    return imageEntity;
  }
}
