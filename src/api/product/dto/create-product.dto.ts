import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 64)
  readonly category: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly image?: string;
}
