import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UploadModule } from './modules/upload/upload.module';
import { SendEmailModule } from './common/send-email/send-email.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), DatabaseModule, AuthModule, PassportModule.register({ session: true }), UploadModule, SendEmailModule, TestimonialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
