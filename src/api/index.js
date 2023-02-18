import { Router } from "express";
import Portfolio from "./portfolio";
import My from "./my";



const app = Router();

app.use("/portfolio", Portfolio);
app.use("/my", My);

export default app;