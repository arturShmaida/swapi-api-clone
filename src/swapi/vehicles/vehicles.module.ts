import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';

import { Vehicle } from './entities/vehicle.entity';
import { CommonService } from '../../common/common.service';
import { Image } from '../../images/entities/image.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      Vehicle,
      Image,
    ]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
