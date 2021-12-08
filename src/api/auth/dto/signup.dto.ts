import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  MaxLength,
} from 'class-validator';
import { GenderEnum } from 'src/database/enum/gender.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;

  @IsNotEmpty()
  @Length(8, 32)
  readonly passwordConfirmation: string;

  @IsNotEmpty()
  @Length(4, 12)
  readonly username: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;
}
