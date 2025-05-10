import { Module } from '@nestjs/common';
import { IpfsController } from './ipfs.controller';
import { ConfigModule } from '@nestjs/config';
import { IpfsService } from './ipfs.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: [IpfsController],
  providers: [IpfsService],
  exports: [],
})
export class IpfsModule {}
