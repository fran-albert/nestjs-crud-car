import { IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;

  @IsString()
  @IsOptional()
  color: string;
}
