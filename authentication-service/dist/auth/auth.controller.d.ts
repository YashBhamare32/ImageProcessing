import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signupBody: SignupDto): Promise<import("./schemas/user.schema").Users>;
    login(loginBody: loginDto, res: any): Promise<any>;
}
