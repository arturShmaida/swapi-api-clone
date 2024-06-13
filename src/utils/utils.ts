import { ConfigService } from '@nestjs/config';
import { TypeKeys } from './constants';
import { config } from 'dotenv';
import { extname } from 'path';

config();
const configService = new ConfigService();

export function getEntityUrl(entityType: TypeKeys, entityId: number) {
  const baseUrl = configService.get('API_BASE_URL');
  return baseUrl + entityType + '/' + entityId;
}

export function getUniqueName(image: Express.Multer.File) {
  const uniqSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extName = extname(image.originalname);
  return uniqSuffix + extName;
}
