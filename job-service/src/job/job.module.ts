import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtModule } from '@nestjs/jwt';
// import { BlobService } from 'src/blob/blob.service';
// import { BlobModule } from 'src/blob/blob.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
// import { blobSchema } from 'src/auth/schemas/blob.schema';
import { jwtConstants } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    HttpModule.register({
      timeout:5000,
      maxRedirects:5
    }),
    ClientsModule.register([{name : "BLOB_SERVICE" , transport: Transport.TCP , options: {host:"blob-service" , port:3002} }]),
    JwtModule.register({
    secret:jwtConstants.secret,
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