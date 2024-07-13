import { ApiProperty } from '@nestjs/swagger';
import { TypeKeys } from '../../utils/constants';

export class ImageUploadDto {
  @ApiProperty()
  assignToEntity: TypeKeys;
  @ApiProperty()
  entityId: number;
}
