import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import sheetRoute from "./routes/sheetRoute.js";
import authRoute from "./routes/authRoute.js";
import geminiRoute from "./routes/geminiRoute.js";
import userRoute from "./routes/userRoute.js";
import linkedinRoute from "./routes/linkedinRoute.js";
import "./config/passport.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 4000;

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/sheet", sheetRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/gemini", geminiRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/linkedin", linkedinRoute);

app.get("/", (req, res) => {
  res.send(
    `Server is working on PORT ${PORT} and project name is Linkedin-Gemini-GoogleSheet-Integration`
  );
});

export default app;
