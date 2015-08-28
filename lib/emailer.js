
var nodemailer = require('nodemailer');
var config = require('../config').email;
var _ = require('lodash');
var fs = require('fs');

/**
 * Send an email using the correspondent email template
 * @param to: email address that will receive the email
 * @param emailTemplate: email template name
 * @param data: Data added to the template
 */
function sendEmail(to, templateName, data){
    var template = _.find(config.emailTemplates, {'name':templateName});

    if(template){
        fs.readFile('../resources/emails/userCreated.html', 'utf8', function(err, html){
            if(err){

            }
            else{
                var transporter = nodemailer.createTransport({
                    service: config.service,
                    auth: config.account
                });

                var mailOptions = {
                    from: template.from,
                    to: to,
                    subject: template.subject,
                    html: html
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }
                    else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });

    }
    else{
        return false;
    }

}
