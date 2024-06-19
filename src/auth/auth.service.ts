import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private readonly jwtService : JwtService
  ) {}

  async signup(signupBody: SignupDto): Promise<Users> {
    const { username, password, tid, oid, aud, azp, name } = signupBody;

    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const newUser = new this.userModel({
      username,
      password,
      tid,
      oid,
      aud,
      azp,
      name,
    });

    try {
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException("Failed to create user");
    }
  }

  async validateUser(loginBody : loginDto) : Promise<Users>{
    try {
        const {username , password} = loginBody;
        const user = await this.userModel.findOne({username});
        if(user && user.password === password){
            return user;
        }else{
            throw new UnauthorizedException("Invalid credentials");
        }
    } catch (error) {
        throw new UnauthorizedException("Invalid credentials");
    }
  }

  async login(user : Users):Promise<string>{
    const tokenObj = {
        id : user._id,
        username:user.username,
        tid:user.tid,
        oid:user.oid,
        aud:user.aud,
        azp:user.azp,
    }
    console.log(tokenObj);

    return this.jwtService.sign(tokenObj);
  }

  async getUsers():Promise<Object>{
    const users = this.userModel.findOne({username : 'Yash'});
    return users;
  }
}
