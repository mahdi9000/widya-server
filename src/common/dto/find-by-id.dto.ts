import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindByIdDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}
