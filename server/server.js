import dotenv from "dotenv";
import path from "path";
import express from "express";
import connectDatabase from "./config/database.js";
import app from "./app.js";
import helmet from "helmet";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDatabase();

const PORT = process.env.PORT || 4000;

// Set Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://linkedin-gemini-gs-server.onrender.com"],
    },
  })
);

// Serve static files from the React app
const __dirname = path.resolve(); // Resolve the current directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// Serve the React app for all client-side routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is working on PORT ${PORT}`);
});
