import { IsString, MinLength } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @MinLength(2)
  name: string;
}
