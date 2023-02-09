const {createTransport} = require('nodemailer');

const sendEmail = async (to , subject, text) =>
{   
    const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: ''
        }
      });
    
      
      await transporter.sendMail({
        to, subject , text , 
        from:"umarjamiljamil31@gmail.com" 
      });
}

module.exports
{
    sendEmail
}