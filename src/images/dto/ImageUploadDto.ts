import { ApiProperty } from '@nestjs/swagger';
import { TypeKeys, entities } from 'src/utils/constants';

export class ImageUploadDto {
  @ApiProperty()
  assignToEntity: TypeKeys;
  @ApiProperty()
  entityId: number;
}
