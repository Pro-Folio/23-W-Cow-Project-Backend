import { Router } from "express";
import Register from "./register";
import Login from "./login";


const app = Router();

app.use("/register", Register);
app.use("/login", Login);



export default app;