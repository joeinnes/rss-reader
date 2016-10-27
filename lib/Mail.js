var email = require("emailjs");

var yourEmail = process.env.GMUN;
var yourPwd = process.env.GMPW;
var yourSmtp = 'smtp.gmail.com';
var smtpServer  = email.server.connect({
   user:    yourEmail, 
   password: yourPwd, 
   host:    yourSmtp, 
   ssl:     true
});

module.exports = smtpServer;