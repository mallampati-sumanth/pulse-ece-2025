const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
OAuth2_client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
function send_mail(options) {
  const accessToken = OAuth2_client.getAccessToken();
  const transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USERNAME,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: process.env.GMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log('Error: ', error);
    } else {
      console.log('Success: ', result);
    }
    transport.close();
  });
}
module.exports = send_mail;
