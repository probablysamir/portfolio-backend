import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @IsPhoneNumber()
  readonly phone: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly github_url: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly linkedin_url: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly instagram_url: string;

  @IsOptional()
  avatar: any;
}
