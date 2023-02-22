import { Router } from "express";
import Portfolio from "./portfolio";
import My from "./my";
import Search from "./search";



const app = Router();

app.use("/portfolio", Portfolio);
app.use("/my", My);
app.use("/search", Search);

export default app;