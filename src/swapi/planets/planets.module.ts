import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { Planet } from './entities/planet.entity';
import { CommonService } from '../../common/common.service';
import { Image } from '../../images/entities/image.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      Planet,
      Image,
    ]),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule { }
