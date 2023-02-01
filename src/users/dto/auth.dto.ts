import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class ValidateUserDto {
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