import { Module } from '@nestjs/common';
import { IpfsModule } from './ipfs/ipfs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    IpfsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
