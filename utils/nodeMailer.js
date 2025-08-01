const nodemailer = require('nodemailer');

const sendmail = async options => {
  try {
    const mailer = nodemailer.createTransport({
      // service:"gmail" //host: smtp.gmail.com // port 587 // securefalse
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: { ciphers: 'SSLv3', rejectUnauthorized: false },
      connectionTimeout: 5 * 60 * 1000,
    });

    const mailOptions = {
      to: options.mail,
      from: process.env.GMAIL_USERNAME,
      subject: options.subject,
      text: options.message,
    };

    await mailer.sendMail(options);
  } catch (error) {
    throw new Error('Please try again');
  }
};

module.exports = sendmail;
