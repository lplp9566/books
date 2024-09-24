import express from "express";
import autoRouter from "./routes/auth.js";
const app = express();
app.use(express.json());
app.use('/', autoRouter);
const PORT = 3000;
app.listen(PORT, () => { console.log("server is ON"); });
