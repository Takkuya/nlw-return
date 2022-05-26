import { MailAdapter, SendMailData } from "../email-adapter";
import nodemailer from "nodemailer";

//isso vem do mailtrap
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "07c609dee36341",
    pass: "48e3ae454b87fd",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    //enviar email
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Gabriel Takuya Yamamoto <takuyagabriel@gmail.com>",
      subject,
      //uso um array pois de colocasse sem um array (`<p> teste</p>`) ao pular linha, o espaço da identação contaria como um espaço
      html: body,
    });
  }
}
