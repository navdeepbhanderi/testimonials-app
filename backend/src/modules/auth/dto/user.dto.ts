import { IsString, IsInt, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password:string
}