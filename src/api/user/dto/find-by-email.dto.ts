import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class FindByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  readonly email: string;
}
