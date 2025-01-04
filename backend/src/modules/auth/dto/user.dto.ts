import { IsString, IsInt, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1,
        minLowercase: 1,
        minLength: 8
    })
    password:string
}