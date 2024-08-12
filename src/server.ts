import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import http from 'http';
import { notFound } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { sendEmails } from './controllers/sendEmail';

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Send Emails </h1> <a href='/send'>send email</a>`);
});

app.get('/send', sendEmails);

app.use(notFound);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is listening on the port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
