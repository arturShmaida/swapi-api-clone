import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { dataSourceMock } from '../../../db/data-source';
import { Image } from '../../images/entities/image.entity';
import { DataSource } from 'typeorm';
import { AppModule } from '../../app.module';
import { forwardRef } from '@nestjs/common';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Vehicle, Image], dataSourceMock),
      ],
      controllers: [VehiclesController],
      providers: [
        VehiclesService,
        {
          provide: DataSource,
          useFactory: () => {
            return {
              DataSource: jest.fn().mockImplementation(() => DataSource),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
