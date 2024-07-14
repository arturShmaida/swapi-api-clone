import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { CommonModule } from '../../common/common.module';
import { AppModule } from '../../app.module';
import { forwardRef } from '@nestjs/common';

describe('PlanetsService', () => {
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Planet]),
      ],
      providers: [PlanetsService],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
