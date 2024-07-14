import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { Starship } from './entities/starship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { Image } from '../../images/entities/image.entity';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('StarshipsController', () => {
  let controller: StarshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([Starship, Image]),
      ],
      controllers: [StarshipsController],
      providers: [StarshipsService],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
