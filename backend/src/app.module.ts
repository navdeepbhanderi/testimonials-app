import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AuthModule, PassportModule.register({ session: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
