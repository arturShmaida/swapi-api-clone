import { Test, TestingModule } from '@nestjs/testing';
import PeopleController from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { CommonModule } from '../../common/common.module';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([People]),
      ],
      controllers: [PeopleController],
      providers: [PeopleService],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
