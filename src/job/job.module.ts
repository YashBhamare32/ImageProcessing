import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { BlobService } from 'src/blob/blob.service';
import { BlobModule } from 'src/blob/blob.module';
import { MongooseModule } from '@nestjs/mongoose';
import { blobSchema } from 'src/auth/schemas/blob.schema';

@Module({
  imports:[JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{
      expiresIn:"60m"
    }
  }),
  BlobModule,
  MongooseModule.forFeature([{name:"Blob" , schema:blobSchema}])
],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
