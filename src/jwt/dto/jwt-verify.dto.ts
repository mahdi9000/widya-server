import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  readonly accessToken: string;
}
