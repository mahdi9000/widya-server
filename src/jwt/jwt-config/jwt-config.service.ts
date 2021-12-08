import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtConfig } from '../interface';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get accessTokenConfig(): IJwtConfig {
    /*
      Made token expiration time to a week for dev purpose.
      I hate refreshing using postman
    */
    const expired =
      this.configService.get('NODE_ENV') === 'dev' || 'development'
        ? '7d'
        : this.configService.get('JWT_EXPIRATION_TIME_ACCESS_TOKEN');

    return {
      secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
      expiresIn: expired,
    };
  }
}
