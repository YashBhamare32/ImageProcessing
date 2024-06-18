import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './auth/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [AuthModule ,
     MongooseModule.forRoot("mongodb://localhost:27017/ImageProc"),
     MongooseModule.forFeature([{name : "Users" , schema : UserSchema}]),
    ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService , JwtService],
})
export class AppModule {}
