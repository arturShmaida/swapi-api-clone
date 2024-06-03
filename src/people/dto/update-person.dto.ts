import { CreatePeopleDto } from './create-person.dto';
import { PartialType } from '@nestjs/swagger/dist/type-helpers/partial-type.helper';

export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {}
