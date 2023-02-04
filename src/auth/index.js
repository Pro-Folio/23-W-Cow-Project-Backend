import { Router } from "express";
import Register from "./register";
import NicknameSame from "./nicknameSame";


const app = Router();

app.use("/register", Register);
app.use("/nicknameSame", NicknameSame);



export default app;