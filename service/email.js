const nodemailer = require('nodemailer');
const logger = require('../logger');
const config = require('../config');

const EMAIL_TRANSPORT_CONFIG = config.email;

const main = async (mailOptions) => {
  logger.debug(
    `Received the following mailOptions: ${JSON.stringify(mailOptions)}`
  );
  const transporter = nodemailer.createTransport(EMAIL_TRANSPORT_CONFIG);
  const sendMail = await transporter.sendMail(mailOptions);
  return sendMail;
};

const sendEmail = async (mailOptions) => {
  try {
    const message = await main(mailOptions);
    logger.debug(`Successfully sent the message: ${JSON.stringify(message)}`);
    return message;
  } catch (e) {
    logger.error(e);
    return e;
  }
};

const sendVerificationEmail = async (userDetails, id) => {
  const { email, username, firstName, lastName } = userDetails;

  const url = `http://${config.host}:${config.port}/users/verify/${id}`;
  const subject = `Please verify your email for your Workman account creation`;
  const text = `Hello ${firstName} ${lastName}! Thank you for creating your account with Workman! Your username is ${username}. Please click the following link to verify your email`;
  const html = `
  <div>
      <h1 style="text-align: center;">Workman</h1>
      <p style="text-align: center;">Hello ${firstName} ${lastName}! Thank you for creating your account with Workman! Your username is ${username}. Please click the following link to verify your email ${url}</p>
      <div style="text-align: center;">
          <a href="${url}"><button style="padding: 10px;">Verify Email</button></a>
      </div>
  </div>
  `;

  const send = await sendEmail({
    from: config.email.auth.user,
    to: email,
    subject,
    text,
    html,
  });

  return send;
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
};
