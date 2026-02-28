import express from "express";
import bootstrap from "./src/app.controller.ts";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
 
const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://nextjs-social-app-one.vercel.app",
];
const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );
    await bootstrap(express, app);
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
