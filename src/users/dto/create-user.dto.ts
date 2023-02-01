import { IsNotEmpty } from 'class-validator';
import { IsArray, IsEmail, IsString, MaxLength, MinLength } from 'class-validator/types/decorator/decorators';

export class CreateUserDto {
  @IsNotEmpty({ message: 'لطفا شماره موبایل خود را وارد کنید' })
  @IsArray()
  mobile: string[];

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
