var aws = require("aws-sdk");
var nodemailer = require("nodemailer");

var ses = new aws.SES();
var s3 = new aws.S3();

exports.handler = function (event, context, callback) {

    var mailOptions = {
        from: "nitishaagarwal3@gmail.com",
        subject: "This is an email sent from a Lambda function!",
        html: `<p>You got a contact message from: <b>${event.emailAddress}</b></p>`,
        to: "nitishaagarwal3@gmail.com",
        // bcc: Any BCC address you want here in an array,
    };

    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: ses
    });

    // send email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("Error sending email");
            callback(err);
        } else {
            console.log("Email sent successfully");
            callback();
        }
    });
};
