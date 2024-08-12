import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendEmails = async (req: Request, res: Response) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ken.padberg@ethereal.email',
      pass: 'fZnUZ9RpJ5CgvHhFe1',
    },
  });

  let info = await transporter.sendMail({
    from: '"Deva" <buildwith92deva@gmail.com> ',
    to: 'bar@example.com',
    subject: 'Hello',
    html: '<h2>Send Emails from typescript NodeJs</h2>',
  });
  res.json(info);
};

// do it when you have send grid account
// export const sendEmails = async (req: Request, res: Response) => {};
