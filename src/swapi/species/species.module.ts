import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { CommonService } from 'src/common/common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Species } from './entities/species.entity';
import { Image } from '../../images/entities/image.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      Species,
      Image,
    ]),
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
