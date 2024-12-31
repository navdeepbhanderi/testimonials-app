import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService, private authService: AuthService) {
        super({
            clientID: configService.get<string>('GOOGLE_AUTH_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_REDIRECT_URL'),
            scope: ['profile', 'email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id, displayName, emails, photos } = profile;
        const createUser = await this.authService.validateUserWithGoogleAuth({
            email: emails[0].value,
            name: displayName,
            profilePicture: photos[0].value,
            googleId: id
        });
        return createUser || null;
    }
}