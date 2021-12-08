import { UnauthorizedException } from '@nestjs/common';

export class SignInException extends UnauthorizedException {
  constructor() {
    super(`Wrong email/password.`);
  }
}
