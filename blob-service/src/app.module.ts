import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlobModule } from './blob/blob.module';

@Module({
  imports: [BlobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
