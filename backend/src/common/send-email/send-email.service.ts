import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmail } from 'src/utils/types';

@Injectable()
export class SendEmailService {
  constructor(public mailService: MailerService) {}

    sendMail(mail: SendEmail) {
        try {
            this.mailService.sendMail({
                to: mail.to,
                replyTo: 'noreply@gmail.com',
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './welcome',
                context: { 
                    name: 'navdeep',
                    confirmation_url: 'google.com',
                },
            });
        } catch (error) {
            console.log(error, 'error')
        }
    }
}
