import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'argon2';

// Service
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from '../user/user.service';

// DTO
import { SignUpDto } from './dto';

// Error handler
import { SignInException } from './exception/sign-in.exception';

// Interface
import { ISignIn } from './interface/signin.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<ISignIn> {
    const { email, username, password, passwordConfirmation } = signUpDto;

    const isDuplicate = await this.userService.findOneByEmailOrUsername({
      email,
      username,
    });

    if (isDuplicate) {
      throw new UnauthorizedException(
        'Username with this email/username already exist.',
      );
    } else if (password !== passwordConfirmation) {
      throw new BadRequestException(
        'Password confirmation must match with the password.',
      );
    }

    const user = await this.userService.create(signUpDto);

    return this.authResponse(user.id, email);
  }

  async signIn(email: string, password: string): Promise<ISignIn> {
    const user = await this.userService.findOneByEmail({ email });

    if (!user) throw new SignInException();
    else if (!(await verify(user.password, password))) {
      throw new SignInException();
    }

    return this.authResponse(user.id, email);
  }

  private authResponse(id: string, email: string): ISignIn {
    const accessToken = this.jwtService.signAccessToken({
      userId: id,
      email,
    });

    return { accessToken, userId: id };
  }
}
