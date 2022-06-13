const nodemailer = require("nodemailer");

async function email_alert(subject, body, to) {

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ADR,
      pass: process.env.MAIL_PASS
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.MAIL_ADR}>`,
    to: to,
    subject: subject,
    text: body
  });

  return `messgage  ${info.accepted}`;
}

module.exports = email_alert;