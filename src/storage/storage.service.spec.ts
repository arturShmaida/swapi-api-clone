import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule)],
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
