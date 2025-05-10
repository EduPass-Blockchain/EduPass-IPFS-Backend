import { Controller, Get } from '@nestjs/common';

@Controller('ipfs')
export class IpfsController {
  @Get()
  getIpfs() {
    return { message: 'IPFS is running' };
  }
}
