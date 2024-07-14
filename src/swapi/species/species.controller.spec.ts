import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { Species } from './entities/species.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { AppModule } from '../../app.module';
import { forwardRef } from '@nestjs/common';

describe('SpeciesController', () => {
  let controller: SpeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Species]),
      ],
      controllers: [SpeciesController],
      providers: [SpeciesService],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
