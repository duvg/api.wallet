import express from 'express';

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello duvg...');
});

export { app };
