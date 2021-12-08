import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 64)
  readonly category?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly image?: string;
}
