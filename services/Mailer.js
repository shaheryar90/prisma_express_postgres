const nodemailer = require("nodemailer");
const { mail } = require("../startup/config");
class MailerService {
  sendVerificationToken(to, token, text, sub) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      //   host: mail.MAIL_HOST,
      //   port: mail.MAIL_PORT,
      //   secure: false,
      auth: {
        user: "shaheryar724@gmail.com",
        pass: "efkeoxpfbfenscrk",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let message = {
      from: "shaheryar724@gmail.com",
      to: to?.email,
      subject: sub,
      text: `${token ? `${text}: ${token}` : text} `,
      html: `<p>${token ? `${text}: ${token}` : text}</p> `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Mail error occurred. " + err.message);
      }
    });
  }

  constactUs(name, category, sub, msg, email) {
    let transporter = nodemailer.createTransport({
      service: mail.MAIL_SERVICE,
      host: mail.MAIL_HOST,
      port: mail.MAIL_PORT,
      secure: true,
      auth: {
        user: mail.MAIL_USER,
        pass: mail.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let message = {
      from: mail.MAIL_FROM,
      to: email,
      subject: sub,
      text: `Name: ${name}
                   Email: ${email}
                   Category: ${category}
                   Message: ${msg} `,
      html: `<p>Name: ${name}<br>
            Email: ${email}<br>
                        Category: ${category}<br>
                        Message: ${msg}  <br>
                    </p> `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
      }
    });
  }

  adminMessage(name, sub, msg, email) {
    let transporter = nodemailer.createTransport({
      service: mail.MAIL_SERVICE,
      host: mail.MAIL_HOST,
      port: mail.MAIL_PORT,
      secure: false,
      auth: {
        user: mail.MAIL_USER,
        pass: mail.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let message = {
      from: mail.MAIL_FROM,
      to: email,
      subject: sub,
      text: `Name: ${name}
                   Email: ${email}
                   Message: ${msg} `,
      html: `<p>Name: ${name}<br>
            Email: ${email}<br>
                        Message: ${msg}  <br>
                    </p> `,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
      }
    });
  }
}
module.exports = new MailerService();
