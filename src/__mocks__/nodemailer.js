const nodemailerMock = {
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn((mailOptions, callback) => {
      if (mailOptions.to === 'fail@example.com') {
        callback(new Error('Failed to send email'), null);
      } else {
        callback(null, { response: 'Email sent' });
      }
    }),
  }),
};

module.exports = nodemailerMock;
