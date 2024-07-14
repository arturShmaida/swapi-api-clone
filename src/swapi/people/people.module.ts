import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PeopleController from './people.controller';
import { People } from './entities/people.entity';
import { Image } from '../../images/entities/image.entity';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([People, Image])],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
