import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserSchema} from "./schemas/user.schema";

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'postgres',
            password: 'Bobby@2032',
            database: 'ImageProcessing',
            entities: [UserSchema],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UserSchema]),
        JwtModule.register({
            secret:"yash123",
            signOptions:{
              expiresIn:"60m"
            }
        })
    ],
    providers:[AuthService],
    controllers:[AuthController],
    exports:[AuthService , TypeOrmModule]
})
export class AuthModule {}