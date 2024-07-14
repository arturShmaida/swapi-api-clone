import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { Species } from './entities/species.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { AppModule } from '../../app.module';
import { forwardRef } from '@nestjs/common';

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Species]),
      ],
      providers: [SpeciesService],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
