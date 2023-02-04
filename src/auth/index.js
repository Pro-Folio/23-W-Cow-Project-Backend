import { Router } from "express";
import Register from "./register";


const app = Router();

app.use("/register", Register);


export default app;