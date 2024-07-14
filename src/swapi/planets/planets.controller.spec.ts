import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { CommonModule } from '../../common/common.module';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('PlanetsController', () => {
  let controller: PlanetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Planet]),
      ],
      controllers: [PlanetsController],
      providers: [PlanetsService],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
