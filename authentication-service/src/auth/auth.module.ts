import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from './schemas/user.schema';
import { jwtConstants } from './constants';

@Module({
    imports:[
        MongooseModule.forRoot("mongodb://localhost:27017/ImageProcMicro"),
        MongooseModule.forFeature([{name : "Users" , schema : UserSchema}]),
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions:{
              expiresIn:"60m"
            }
        })
    ],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule {}