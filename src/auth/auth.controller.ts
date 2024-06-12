import { Body, Controller, Get, HttpException, Post, Req } from '@nestjs/common';
import { authDataType } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req : Request){
        // const user = this.authService.validateUser(authData);

        return req.user
    }


    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    status(@Req() req:Request){
        return "Successfuly Authenticated"
    }
}
