import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './auth/schemas/user.schema';
import { JobModule } from './job/job.module';
import { BlobModule } from './blob/blob.module';
@Module({
  imports: [AuthModule ,
     MongooseModule.forRoot("mongodb://localhost:27017/ImageProc"),
     MongooseModule.forFeature([{name : "Users" , schema : UserSchema}]),
     JobModule,
     BlobModule,
     
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}