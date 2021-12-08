import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { AccessTokenPayloadDto, VerifyAccessTokenDto } from './dto';
import { IAccessTokenDecoded } from './interface';
import { JwtConfigService } from './jwt-config/jwt-config.service';

@Injectable()
export class JwtService {
  constructor(private readonly jwtConfig: JwtConfigService) {}

  signAccessToken(payload: AccessTokenPayloadDto): string {
    const { secret, expiresIn } = this.jwtConfig.accessTokenConfig;
    return sign(payload, secret, { expiresIn });
  }

  verifyAccessToken({
    accessToken,
  }: VerifyAccessTokenDto): IAccessTokenDecoded {
    const { secret } = this.jwtConfig.accessTokenConfig;
    const decoded = <IAccessTokenDecoded>verify(accessToken, secret);
    return decoded;
  }
}
