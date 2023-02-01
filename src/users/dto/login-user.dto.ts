import { IsNotEmpty, IsArray, IsEmail, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class loginDto {
  @IsNotEmpty({ message: 'لطفا ایمیل خود را وارد کنید' })
  @IsEmail()
  @IsString()
  @MaxLength(200)
  email: string;

  @IsNotEmpty({ message: 'لطفا رمزعبور خود را وارد کنید' })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
