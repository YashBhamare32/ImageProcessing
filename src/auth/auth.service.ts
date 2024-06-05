import { Injectable } from '@nestjs/common';
import { authDataType } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const tempUser=[
    {
        id:1,
        "username":"Yash",
        "password":"password1"
    },
    {
        id:2,
        "username":"Pranav",
        "password":"password2"
    },
    {
        id:3,
        "username":"Akshat",
        "password":"password3"
    }
]

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){}

    validateUser(authData: authDataType){
        const username = authData.username;
        const password = authData.password;

        const findUser = tempUser.find((user)=>user.username === username);
        if(!findUser){
            return null;
        }

        if(password === findUser.password){
            //create a jwt token and send it back
            const {password , ...user} = findUser;
            return this.jwtService.sign(user);
        }
    }
    
}
