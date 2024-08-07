import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadDto } from './dto/ImageUploadDto';
import { Image } from './entities/image.entity';
import {
  Roles,
  ROLE_ADMIN,
  ROLE_USER,
} from '../auth/decorators/roles.decorator';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        entityId: {
          type: 'number',
        },
        assignToEntity: {
          enum: [
            'people',
            'films',
            'planets',
            'species',
            'starships',
            'vehicles',
          ],
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadImage(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.imagesService.uploadImage(file, imageUploadDto);
  }

  @Get(':id')
  @Roles([ROLE_ADMIN, ROLE_USER])
  async getImage(@Param('id') id: string): Promise<Image> {
    return this.imagesService.findOne(+id);
  }
  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  async getImages(): Promise<Image[]> {
    return this.imagesService.findAllRecords();
  }

  @Delete(':id')
  @Roles([ROLE_ADMIN])
  async removeOne(@Param('id') id: string) {
    return this.imagesService.removeImage(+id);
  }
  @Delete()
  @Roles([ROLE_ADMIN])
  async removeAll() {
    return this.imagesService.removeAllImages();
  }
}
