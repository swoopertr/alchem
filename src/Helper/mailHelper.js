const nodemailer = require('nodemailer');
let settings= require('../Config/setting');

let mailManaager = {
    send_mail: function (to, topic, body, cb) {
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
            subject: topic, // Subject line
            html: body, // html body
          }).then(info => {
            cb && cb(info);
          }).catch((err)=>{
            console.log(err);
            cb && cb({status: 'err'});
          });
    },
    send_mail_async: function (to, topic, body) {
      return new Promise((resolve, reject) => {
        mailManaager.send_mail(to, topic, body, function (result) {
          resolve(result);
        });
      });
    }
};


module.exports = mailManaager;










