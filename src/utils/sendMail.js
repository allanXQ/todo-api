const nodeoutlook = require("nodejs-nodemailer-outlook");
require("dotenv").config();

const sendEmail = ({ to, subject, html, onError, onSuccess }) => {
  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: html,
    onError: (e) => {
      if (onError) onError(e);
    },
    onSuccess: (i) => {
      if (onSuccess) onSuccess(i);
    },
  });
};

module.exports = sendEmail;
