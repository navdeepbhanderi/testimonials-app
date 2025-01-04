import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { SendEmailService } from 'src/common/send-email/send-email.service';
import { DatabaseService } from 'src/providers/database/database.service';

@Injectable()
export class AuthService {
    constructor(private databaseService: DatabaseService, private jwtService: JwtService, private sendEmailService: SendEmailService) { }

    async validateUser(User: Prisma.UsersCreateInput) {
        const findUser = await this.findUserByEmail(User.email);

        if (findUser && findUser.password === User.password) {
            const { password, ...result } = findUser;
            console.log(__dirname)
            // this.sendEmailService.sendMail({ to: User.email, text: 'Logged in successfull', subject: 'login' })
            return result;
        }

        if (findUser && !findUser.password && findUser.googleId) {
            throw new HttpException("Your account is associated with google signin please update password to continue." ,401)
        }

        throw new UnauthorizedException();
    }

    async createUser(User: Prisma.UsersCreateInput) {
        const findUser = await this.findUserByEmail(User.email);
        if (findUser) {
            throw new HttpException("User already exists", HttpStatus.CONFLICT)
        }
        // this.sendEmailService.sendMail({ to: User.email, text: 'Logged in successfull', subject: 'login' })
        return await this.databaseService.users.create({ data: User });
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async validateUserWithGoogleAuth(User: Prisma.UsersCreateInput) {
        const user = await this.databaseService.users.findUnique({ where: { email: User.email } });
        if (user) return user;
        return await this.databaseService.users.create({ data: User });
    }

    async findUserById(id: number) {
        return await this.databaseService.users.findUnique({ where: { id: id } });
    }

    async findUserByEmail(email: string) {
        return await this.databaseService.users.findUnique({ where: { email } });
    }
}
