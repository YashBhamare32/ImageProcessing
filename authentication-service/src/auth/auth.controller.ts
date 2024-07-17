import { Body, Controller, Get, Post, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}


    @ApiOperation({ summary: 'User signup' })
    @ApiResponse({ status: 201, description: 'User signed up successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({type:SignupDto})
    @Post('signup')
    async signup(@Body() signupBody : SignupDto){
        const user = await this.authService.signup(signupBody);
        return user;
    }

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiBody({ type: loginDto })
    @Post('login')
    async login(@Body() loginBody : loginDto , @Response() res){
        const user = await this.authService.validateUser(loginBody);

        if(!user){
            throw new UnauthorizedException();
        }

        const token = await this.authService.login(user);
        return res.json({
            JwtToken : token
        });
    }


    //Used for testing Guards
    // @UseGuards(AuthGuard)
    // @Get('getUsers')
    // async getUsers(){
    //     const users = await this.authService.getUsers();
    //     return users;
    // }
}