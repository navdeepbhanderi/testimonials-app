import { PassportSerializer } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private authService: AuthService) {
        super();
    }

    serializeUser(user: Prisma.UsersCreateInput, done: Function) {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        const user = await this.authService.findUserById(payload.id);
        return user ? done(null, user) : done(null, null);
    }
}