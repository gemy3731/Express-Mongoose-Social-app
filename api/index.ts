import express from "express";
import bootstrap from "../src/app.controller.ts";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://nextjs-social-app-one.vercel.app",
];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
const startServer = async () => {
  try {


    app.use(cors(corsOptions));
    
    // 3. MANUAL PREFLIGHT HANDLER (The "Secret Sauce")
    // This interceptor returns a 200 OK for every OPTIONS request 
    // before your database or routes even try to load.
    app.options("*", cors(corsOptions));

    bootstrap(express, app);

    if (process.env.NODE_ENV !== "production") {
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

startServer();
