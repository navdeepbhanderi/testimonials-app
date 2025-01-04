import { Global, Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.getOrThrow<string>('EMAIL_HOST'),
        auth: {
          user: configService.getOrThrow<string>('SECRET_SEND_EMAIL'),
          pass: configService.getOrThrow<string>('SECRET_EMAIL_APP_PASSWORD'),
        },
      },
      defaults: {
        from: `"Testimonials " <${configService.get('SECRET_SEND_EMAIL')}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    })
  })],
  providers: [SendEmailService],
  exports: [SendEmailService]
})
export class SendEmailModule { }
