import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "1713964417cc35",
    pass: "23463c8428170d"
    }
});

export class NodemailMailAdapter implements MailAdapter{
   async sendMail(data: SendMailData){
         //Depois de criar um feedback no banco 

         await transport.sendMail({
         from: 'Equipe Feedget <oi@feedget.com>',
         to: "Arthur Fernandes <arthurroque007@gmail.com>",
         subject: data.subject,
         html: data.body,
     });
   };
}