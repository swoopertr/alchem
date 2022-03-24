const nodemailer = require('nodemailer');
let settings= require('../Config/setting');

let mailManaager = {
    send_mail: function (to, topic, body) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: settings.emailConfig.email,
              pass: settings.emailConfig.pass
            },
          });
          
        
          transporter.sendMail({
            from: settings.emailConfig.email, // sender address
            to: to, // list of receivers
            subject: "Eğitim Soruları", // Subject line
            html: "<b>Alchem Life Eğitimlerine katıldığınız için teşekkür ederiz, size atanan sorulara link üzerinden ulaşabilirsiniz.</b>", // html body
          }).then(info => {
            console.log({info});
          }).catch(console.error);
    }
};


module.exports = mailManaager;










