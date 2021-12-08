import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './jwt-config/jwt-config.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [ConfigModule],
  providers: [JwtConfigService, JwtService],
  exports: [JwtConfigService, JwtService],
})
export class JwtModule {}
