const nodemailer = require('nodemailer');

const mail = {}

const transporter = nodemailer.createTransport({
  host: "mail.zonadeoportunidad.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "info@zonadeoportunidad.com",
    pass: "Runero!54.",
  },
});


mail.send = async function (to, subject, body) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Soporte PowerAdsSearch" <info@zonadeoportunidad.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: body // plain text body
    
  });

  console.log("Message sent: %s", info.messageId);
  
}

module.exports = mail

