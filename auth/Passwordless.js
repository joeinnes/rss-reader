var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore');
var mail = require('../lib/Mail.js')


var pathToMongoDb = process.env.MONGOCONNECTIONSTRING;
var host = process.env.HOST;
passwordless.init(new MongoStore(pathToMongoDb));
passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        // Send out token
        mail.send({
           text:    'Hello!\nYou can now access your account here: ' 
                + host + '/api/log_me_in?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend), 
           from:    yourEmail, 
           to:      recipient,
           subject: 'Token for ' + host
        }, function(err, message) { 
            if(err) {
                console.log(err);
            }
            callback(err);
        });
    });

module.exports = passwordless;