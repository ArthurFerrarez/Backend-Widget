import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { NodemailMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()


// Teste de envio de email -> FOI PARA OUTRO COMPONENTE
// const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "1713964417cc35",
//       pass: "23463c8428170d"
//     }
//   });



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    try{

        const prismaFeedbackRepository = new PrismaFeedbackRepository()
        const nodemailerMailAdapter = new NodemailMailAdapter()
    
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter)
     
        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot
        })
        
        return res.status(201).send();
    } catch ( err){
        console.error(err);

        return res.status(500).send();
    }
    


     //Depois de criar um feedback no banco -> FOI PARA OUTRO COMPONENTE
    //  await transport.sendMail({
    //      from: 'Equipe Feedget <oi@feedget.com>',
    //      to: "Arthur Fernandes <arthurroque007@gmail.com>",
    //      subject: "Novo feedback",
    //      html: [
    //          `<div style="font-family: sans-serif; font-size:16px, color: #111">`,
    //          `<p>Tipo do feedback: ${type}</p>`,
    //          `<p>Comentário: ${comment}</p>`,
    //          `</div>`
    //      ].join('\n')
    //  });
 
     
 });