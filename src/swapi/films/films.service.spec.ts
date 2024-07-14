import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { CommonModule } from '../../common/common.module';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        CommonModule,
        TypeOrmModule.forFeature([Film]),
      ],
      providers: [FilmsService],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
