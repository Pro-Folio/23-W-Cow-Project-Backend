import { Router } from "express";
import MainPage from "./mainPage";
import MyPage from "./myPage";

const app = Router();

app.use("/mainPage", MainPage);
app.use("/myPage", MyPage);

export default app;