
import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        const storage = memoryStorage();
        return {
            storage: storage,
        }
    } 
}
