import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

// Service
import { AuthService } from './auth.service';

// DTO
import { SignUpDto } from './dto';

// Guard
import { LocalAuthGuard } from './guard/local.guard';

// Interface
import { ISignInWithUser } from './interface/signin-with-user.interface';
import { ISignIn } from './interface/signin.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ISignIn> {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() { user }: ISignInWithUser): Promise<ISignIn> {
    return user;
  }
}
