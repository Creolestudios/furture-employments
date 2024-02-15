import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';
import { EMAIL_MSG } from '../utils/constants';

config();
const EmailConfig = MailerModule.forRoot({
  transport: {
    host: process.env.SEND_GRID_HOST,
    port: process.env.SEND_GRID_PORT,
    auth: {
      user: process.env.SEND_GRID_USER,
      pass: process.env.SEND_GRID_API_KEY,
    },
  },
  defaults: EMAIL_MSG.EMAIL_DEFAULT,
  template: {
    // REVIEW use relative path
    //NOTE - resolved
    dir: process.cwd() + `/src/utils/emailTemplate`,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});

export default EmailConfig;
