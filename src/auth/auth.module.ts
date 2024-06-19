import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

@Module({
    imports:[
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
