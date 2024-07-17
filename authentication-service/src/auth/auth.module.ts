import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports:[
        MongooseModule.forRoot("mongodb+srv://user01:user01@cluster0.enjinep.mongodb.net/ptc-microserviceYash"),
        MongooseModule.forFeature([{name : "Users" , schema : UserSchema}]),
        JwtModule.register({
            secret:"yash123",
            signOptions:{
              expiresIn:"60m"
            }
        })
    ],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule {}