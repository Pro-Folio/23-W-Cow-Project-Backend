import express from "express";
import api from "./api";
import auth from "./auth";

const app = express();
const port = 3000;

const { sequelize } = require("../models");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api", api);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});