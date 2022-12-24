import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
process.env.APP_ENV = process.env.NODE_ENV ?? 'development';

dotenv.config({
  path: path.join(__dirname, `/../config/${process.env.APP_ENV}.env`),
});

console.log(process.env.APP_FOO);

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello duvg...');
});

export { app };
