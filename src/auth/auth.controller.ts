import { Body, Controller, Get, Post, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}
    @Post('signup')
    async signup(@Body() signupBody : SignupDto){
        const user = await this.authService.signup(signupBody);
        return user;
    }

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
