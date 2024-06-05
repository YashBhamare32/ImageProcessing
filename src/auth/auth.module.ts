import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports : [
    JwtModule.register({
      secret:"yash123",
      signOptions:{expiresIn:"1h"}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , JwtStrategy]
})
export class AuthModule {}
