import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Module
import { JwtModule } from 'src/jwt/jwt.module';
import { UserModule } from '../user/user.module';

// Provider
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Guard
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [ConfigModule, JwtModule, UserModule],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
