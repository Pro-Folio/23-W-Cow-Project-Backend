import express from 'express';
import api from './api';
import auth from './auth';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 8080;

const { sequelize } = require('../models');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: 'htp://localhost:3000', // 출처 허용 옵션
    credentials: true,
  })
);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

app.use('/api', api);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
