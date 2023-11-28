const {createTransport} = require('nodemailer');

const sendEmail = async (to , subject, text) =>
{   
    const tarnspoter = createTransport(
        {host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }}
    );


    await tarnspoter.sendMail(
        {
               to , subject , text
        }
    )
}

module.exports
{
    sendEmail
}