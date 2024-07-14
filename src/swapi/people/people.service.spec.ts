import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { CommonModule } from '../../common/common.module';
import { AppModule } from '../../app.module';
import { forwardRef } from '@nestjs/common';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([People]),
      ],
      providers: [PeopleService],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
