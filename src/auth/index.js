import { Router } from "express";
import Register from "./register";
import NicknameSame from "./nicknameSame";
import Login from "./login";


const app = Router();

app.use("/register", Register);
app.use("/nicknameSame", NicknameSame);
app.use("/login", Login);



export default app;