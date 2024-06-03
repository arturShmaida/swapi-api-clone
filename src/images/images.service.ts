import { Injectable, InternalServerErrorException, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ImageUploadDto } from './dto/ImageUploadDto';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { EntityTypeUnion, RepositoryTypeUnion, TypeKeys } from 'src/utils/constants';
import { createReadStream } from 'fs';
import { join } from 'path';
const fs = require('fs').promises;

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
  ) { }

  async uploadImage(image: Express.Multer.File, imageUploadDto: ImageUploadDto) {

    const { assignToEntity, entityId } = imageUploadDto

    const imageEntity = this.imageRepository.create();

    const lastImageArray = await this.imageRepository.find({ take: 1, order: { id: "desc" } })
    let newImageId: number;
    if (lastImageArray.length === 0) {
      newImageId = 1;
    } else {
      newImageId = lastImageArray[0].id + 1;
    }

    imageEntity.name = image.filename;
    imageEntity.id = newImageId;
    imageEntity.url = 'localhost:3000/images/' + newImageId;

    let linkedImageEntity = await this.linkImageToEntity(assignToEntity, entityId, imageEntity);
    
    return await this.imageRepository.save(linkedImageEntity);
  }

  async findAllRecords(): Promise<Image[]> {
    return await this.imageRepository.find();
  }
  async findOne(id: number): Promise<StreamableFile> {
    const imageEntity = await this.imageRepository.findOneBy({ id })
    if (!imageEntity) {
      throw new NotFoundException(`Image with id: ${id} is Not Found!`);
    }
    const imageName = imageEntity.name;
    const pathToImage = join(process.cwd(), "uploads/images/", imageName)
    const imageFile = createReadStream(pathToImage)
    return new StreamableFile(imageFile);
  }

  async removeImage(id: number) {
    const imageEntity = await this.imageRepository.findOneBy({ id })
    if (!imageEntity) {
      throw new NotFoundException(`Image with id: ${id} is Not Found!`);
    }
    const imageName = imageEntity.name;
    const pathToImage = join(process.cwd(), "uploads/images/", imageName)

    try {
      await fs.unlink(pathToImage);
      return await this.imageRepository.remove(imageEntity);
    } catch (error) {
      console.log(error)
    }
  }
  async removeAllImages() {
    try {
      let allImages = await this.findAllRecords();
      for (let image of allImages) {
        await this.removeImage(image.id);
      }
      return {success: true}
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Unexpected error while removing all images");
    }
  }

  private async linkImageToEntity(assignToEntity: TypeKeys, entityId: number, imageEntity: Image) {
    let hostEntity: EntityTypeUnion;

    let query: FindOneOptions<EntityTypeUnion> = { where: { id: entityId }, relations: ["images"], select: ["images"] }
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
      throw new NotFoundException(`The ${assignToEntity} entity with id: ${entityId} is Not Found! Image can't be upload without assigned entity`);
    }
    return imageEntity
  }



}
