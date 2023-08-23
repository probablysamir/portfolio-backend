import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  github_url: string;

  @IsUrl()
  @IsOptional()
  live_url: string;

  @IsArray()
  @ArrayMinSize(1)
  tags: string[];
}
