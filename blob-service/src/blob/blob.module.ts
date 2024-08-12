import { Module } from '@nestjs/common';
import { BlobController } from './blob.controller';
import { BlobService } from './blob.service';
import { JwtModule } from '@nestjs/jwt';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlobSchema} from "./schemas/blob.schema";

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'Bobby@2032',
      database: 'ImageProcessing',
      entities: [BlobSchema],
      synchronize: false,
    }),
      TypeOrmModule.forFeature([BlobSchema]),
    JwtModule.register({
      secret:"yash123",
      signOptions:{expiresIn:"60m"}
    }),
  ],
  controllers: [BlobController],
  providers: [BlobService],
  exports:[BlobService , TypeOrmModule]
})
export class BlobModule {}