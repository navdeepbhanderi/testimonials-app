import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/providers/database/database.service';

@Injectable()
export class AuthService {
    constructor(private databaseService: DatabaseService, private jwtService: JwtService) { }

    async validateUser(authPayload: Prisma.UsersCreateInput) {
        const findUser = await this.databaseService.users.findUnique({ where: { email: authPayload.email } });

        if (findUser && findUser.password === authPayload.password) {
            const { password, ...result } = findUser;
            return result;
        }

        throw new UnauthorizedException();
    }

    async createUser(userPayload: Prisma.UsersCreateInput) {
        return await this.databaseService.users.create({ data: userPayload });
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async validateUserWithGoogleAuth(userDetails: Prisma.UsersCreateInput) {
        const user = await this.databaseService.users.findUnique({ where: { email: userDetails.email } });
        if (user) return user;
        return await this.databaseService.users.create({ data: userDetails });
    }

    async findUserById(id: number) {
        return await this.databaseService.users.findUnique({ where: { id: id } });
    }
}
