import { IsNotEmpty, IsString, IsUUID, IsEmail } from 'class-validator';

export class AccessTokenPayloadDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
