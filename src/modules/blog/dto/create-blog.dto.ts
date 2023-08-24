import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  image: any;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsBoolean()
  @IsOptional()
  is_published: boolean;
}
