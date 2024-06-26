const nodemailer = require('nodemailer');
const sendNotification = require('../utils/sendNotification');
const config = require('../config');

jest.mock('nodemailer');

describe('sendNotification', () => {
  it('should send an email notification', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const text = 'Test Email Content';

    const result = await sendNotification.sendEmail(to, subject, text);

    expect(result).toEqual({ response: 'Email sent' });
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(
      {
        from: config.EMAIL_USER,
        to,
        subject,
        text,
      },
      expect.any(Function)
    );
  });

  it('should handle email sending errors', async () => {
    const to = 'fail@example.com'; // Use this email to simulate a failure
    const subject = 'Test Subject';
    const text = 'Test Email Content';

    await expect(sendNotification.sendEmail(to, subject, text)).rejects.toThrow('Failed to send email');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(
      {
        from: config.EMAIL_USER,
        to,
        subject,
        text,
      },
      expect.any(Function)
    );
  });
});
