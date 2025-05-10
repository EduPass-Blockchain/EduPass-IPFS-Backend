import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.ipfsService.uploadImage(file);
  }

  @Post('upload-json')
  async uploadJson(@Body() json: any) {
    return this.ipfsService.uploadJson(json);
  }
}
