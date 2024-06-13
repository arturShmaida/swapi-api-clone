import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { Image } from 'src/images/entities/image.entity';
import { IMAGE_URL_TIME_TO_LIVE } from 'src/utils/constants';

@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {}

  S3ClientFactory() {
    const bucketRegion = this.configService.get('BUCKET_REGION');
    const bucketAccessKey = this.configService.get('BUCKET_ACCESS_KEY');
    const bucketSecretKey = this.configService.get('BUCKET_SECRET_KEY');
    return new S3Client({
      credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretKey,
      },
      region: bucketRegion,
    });
  }
  async sendFile(file: Express.Multer.File, uniqueName: string) {
    const s3 = this.S3ClientFactory();
    const bucketName = this.configService.get('BUCKET_NAME');
    const param: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: uniqueName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(param);

    try {
      return await s3.send(command);
    } catch (error) {
      throw error;
    } finally {
      s3.destroy();
    }
  }

  async getEnitiesWithSignedUrl(imageEntities: Image[]) {
    const s3 = this.S3ClientFactory();
    const bucketName = this.configService.get('BUCKET_NAME');

    try {
      for (const entity of imageEntities) {
        const param: GetObjectCommandInput = {
          Bucket: bucketName,
          Key: entity.name,
        };
        const command = new GetObjectCommand(param);
        entity.url = await getSignedUrl(s3, command, {
          expiresIn: IMAGE_URL_TIME_TO_LIVE,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      s3.destroy();
    }

    return imageEntities;
  }

  async removeFile(imageName: string) {
    const s3 = this.S3ClientFactory();
    const bucketName = this.configService.get('BUCKET_NAME');
    const param: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: imageName,
    };
    const command = new DeleteObjectCommand(param);

    try {
      await s3.send(command);
      return true;
    } catch (error) {
      throw error;
    } finally {
      s3.destroy();
    }
  }
}
