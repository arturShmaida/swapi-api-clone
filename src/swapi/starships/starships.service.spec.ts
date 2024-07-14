import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { Starship } from './entities/starship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Starship]),
      ],
      providers: [StarshipsService],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
