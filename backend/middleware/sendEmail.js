const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    

      let transporter = await nodemailer.createTransport({
       
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "aa2814c6843e99",
              pass: "95e2ba8ffa215a"
            }
          });
            
      

      let mailOptions ={
          from:"hv101218@gmail.com",
          to:options.email,
          subject:options.subject,
          text:options.message,
      }

      await transporter.sendMail(mailOptions);
};

