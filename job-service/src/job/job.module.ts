import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtModule } from '@nestjs/jwt';
// import { BlobService } from 'src/blob/blob.service';
// import { BlobModule } from 'src/blob/blob.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
// import { blobSchema } from 'src/auth/schemas/blob.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[ClientsModule.register([
    {
      name:"JOB_SERVICE",
      transport: Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'job_queue'
      }
    }
  ]),
    HttpModule.register({
      timeout:5000,
      maxRedirects:5
    }),
    ClientsModule.register([{name : "BLOB_SERVICE" , transport: Transport.TCP , options: {host:"blob-service" , port:3002} }]),
    JwtModule.register({
    secret:"yash123",
    signOptions:{
      expiresIn:"60m"
    },
  }),
  // BlobModule,
  // MongooseModule.forFeature([{name:"Blob" , schema:blobSchema}])
],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}