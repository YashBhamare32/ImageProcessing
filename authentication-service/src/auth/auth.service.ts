import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import {UserSchema} from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema) private readonly userRepository : Repository<UserSchema>,
    private readonly jwtService : JwtService
  ) {}

  async signup(signupBody: SignupDto): Promise<UserSchema> {
    const { username, password, tid, oid, aud, azp, name } = signupBody;

    const existingUser = await this.userRepository.findOneBy({ username });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    try {
        const newUser = await this.userRepository.save({
            username,
            password:hashedPassword,
            tid,
            oid,
            aud,
            azp,
            name,
        });
      return newUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUser(loginBody : loginDto) : Promise<UserSchema>{
    try {
        const {username , password} = loginBody;
        const user = await this.userRepository.findOneBy({username});
        if(user && (await bcrypt.compare(password , user.password))){
            return user;
        }else{
            throw new UnauthorizedException("Invalid credentials");
        }
    } catch (error) {
        throw new UnauthorizedException("Invalid credentials");
    }
  }

  async login(user : UserSchema):Promise<string>{
    const tokenObj = {
        id : user.id,
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
    const users = this.userRepository.find();
    return users;
  }
}