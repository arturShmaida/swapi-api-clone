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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadDto } from './dto/ImageUploadDto';
import { Image } from './entities/image.entity';

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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, image, callback) => {
          const uniqSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extName = extname(image.originalname);
          callback(null, uniqSuffix + extName);
        },
      }),
    }),
  )
  async uploadImage(
    @Body() imageUploadDto: ImageUploadDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({fileType: "jpeg"}).build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
    ) file: Express.Multer.File,
  ) {
    console.log(file)
    return this.imagesService.uploadImage(file, imageUploadDto);
  }

  @Get(":id")
  @Header("Content-Type","image/jpeg")
   async getImage(
    @Param("id") id: string
  ) : Promise<StreamableFile>{
    return this.imagesService.findOne(+id);
  }
  @Get()
   async getImages() : Promise<Image[]>{
    return this.imagesService.findAllRecords();
  }
  
  @Delete(":id")
  async removeOne(@Param("id") id: string){
    return this.imagesService.removeImage(+id);
  }
  @Delete()
  async removeAll(){
    return this.imagesService.removeAllImages();
  }

  
}
