import { IsNotEmpty, Length } from 'class-validator';
import { FindByEmailDto } from './find-by-email.dto';

export class FindByEmailOrUsernameDto extends FindByEmailDto {
  @IsNotEmpty()
  @Length(4, 12)
  readonly username: string;
}
