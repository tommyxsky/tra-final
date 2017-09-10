const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

let mailOptions = {
  from: 'Johnny Ballgame <Johnny@ballgame.com>', // sender address
  to: 'Jenny@Ballgame.com, zack@attack.com', // list of receivers
  subject: 'Interfacing with SMTP yo!', // Subject line
  text: 'I **invented** the Internet', // plain text
  html: 'I <b>really</b> invented the internet' // html
}

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});
