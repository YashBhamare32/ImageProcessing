import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Users } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt";

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = new this.userModel({
      username,
      password:hashedPassword,
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
        if(user && (await bcrypt.compare(password , user.password))){
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