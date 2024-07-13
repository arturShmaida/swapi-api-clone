import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { Starship } from './entities/starship.entity';
import { Image } from '../../images/entities/image.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      Starship,
      Image,
    ]),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}
