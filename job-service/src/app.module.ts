import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
