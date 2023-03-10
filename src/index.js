import express from "express";
import api from "./api";
import auth from "./auth";
import dotenv from "dotenv";
import cors from "cors";
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = 8080;


const { sequelize } = require("../models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'None'
  }
}));

app.use(express.json());
app.use("/api", api);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});