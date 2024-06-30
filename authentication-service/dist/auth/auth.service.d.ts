import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Users } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    constructor(userModel: Model<Users>, jwtService: JwtService);
    signup(signupBody: SignupDto): Promise<Users>;
    validateUser(loginBody: loginDto): Promise<Users>;
    login(user: Users): Promise<string>;
    getUsers(): Promise<Object>;
}
