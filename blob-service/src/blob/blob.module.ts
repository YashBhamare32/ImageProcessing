import { Module } from '@nestjs/common';
import { BlobController } from './blob.controller';
import { BlobService } from './blob.service';
import { MongooseModule } from '@nestjs/mongoose';
import { blobSchema } from './schemas/blob.schema';

@Module({
  imports:[
    MongooseModule.forRoot("mongodb://localhost:27017/ImageProcMicro"),
    MongooseModule.forFeature([{name:"Blob" , schema:blobSchema}])
  ],
  controllers: [BlobController],
  providers: [BlobService],
  exports:[BlobService]
})
export class BlobModule {}