import { Injectable } from '@nestjs/common';
import { PinataSDK } from 'pinata';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IpfsService {
  private readonly pinata: PinataSDK;

  constructor(private configService: ConfigService) {
    this.pinata = new PinataSDK({
      pinataJwt: configService.get<string>('PINATA_JWT'),
      pinataGateway: configService.get<string>('PINATA_GATEWAY'),
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const fileName = uuidv4().toString() + '.png';
    const fileBuffer = file.buffer;
    const readyFile = new File([fileBuffer], fileName, {
      type: 'image/png',
    });

    try {
      const result = await this.pinata.upload.public.file(readyFile);
      return result.cid;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJson(json: any) {
    const jsonString = JSON.stringify(json);
    const jsonBuffer = Buffer.from(jsonString, 'utf-8');
    const fileName = uuidv4().toString() + '.json';
    const readyFile = new File([jsonBuffer], fileName, {
      type: 'application/json',
    });

    try {
      const result = await this.pinata.upload.public.file(readyFile);
      return result.cid;
    } catch (error) {
      console.error('Error uploading JSON to IPFS:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }
}
