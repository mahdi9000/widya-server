import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/api/user/user.service';
import { User } from 'src/database/entity/user.entity';
import { IAccessTokenDecoded } from 'src/jwt/interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_ACCESS_TOKEN'),
    });
  }

  async validate({ userId }: IAccessTokenDecoded): Promise<User> {
    try {
      const user = await this.userService.findOneById({ id: userId });

      if (!user) throw new UnauthorizedException();

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
