import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor} from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadDto } from './dto/ImageUploadDto';
import { Image } from './entities/image.entity';
import { Roles, ROLE_ADMIN, ROLE_USER } from 'src/auth/decorators/roles.decorator';
import { MulterConfig } from 'src/config/multer.config';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

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

          enum: ['people', 'films', 'planets', 'species', 'starships', 'vehicles']
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file',  {storage: memoryStorage()}),
  )
  async uploadImage(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: "jpeg" }).build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
    ) file: Express.Multer.File,
  ) {
    return this.imagesService.uploadImage(file, imageUploadDto);
  }

  @Get(":id")
  @Roles([ROLE_ADMIN, ROLE_USER])
  async getImage(
    @Param("id") id: string
  ): Promise<Image> {
    return this.imagesService.findOne(+id);
  }
  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  async getImages(): Promise<Image[]> {
    return this.imagesService.findAllRecords();
  }

  @Delete(":id")
  @Roles([ROLE_ADMIN])
  async removeOne(@Param("id") id: string) {
    return this.imagesService.removeImage(+id);
  }
  @Delete()
  @Roles([ROLE_ADMIN])
  async removeAll() {
    return this.imagesService.removeAllImages();
  }


}
