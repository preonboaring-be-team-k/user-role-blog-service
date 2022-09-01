import { IsOptional, IsString } from 'class-validator';

export class EditFreeBoardDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
