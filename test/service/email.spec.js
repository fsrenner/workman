const nodemailer = require('nodemailer');
const { email } = require('../../service');

describe('Email Service Tests', () => {
  describe('Testing the sendVerificationEmail', () => {
    it('Should call sendMail', async () => {
      const responseMessage = 'email sent';
      const sendMailMock = jest.fn().mockReturnValue(responseMessage);
      jest.mock('nodemailer');
      nodemailer.createTransport = jest
        .fn()
        .mockReturnValue({ sendMail: sendMailMock });
      const response = await email.sendVerificationEmail(
        {
          email: 'test',
          username: 'test',
          firstName: 'test',
          lastName: 'test',
        },
        1
      );
      expect(response).toEqual(responseMessage);
      expect(sendMailMock).toHaveBeenCalled();
    });
  });
});
