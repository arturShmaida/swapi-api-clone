import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { CommonModule } from '../../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Image } from '../../images/entities/image.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Film, Image])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
