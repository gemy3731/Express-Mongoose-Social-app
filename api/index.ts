import express from "express";
import bootstrap from "../src/app.controller.ts";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// const allowedOrigins = [
//   "http://localhost:3001",
//   "https://nextjs-social-app-one.vercel.app",
// ];
// const corsOptions = {
//   origin: function (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
const startServer = async () => {
  try {

    const allowedOrigins = [
      "http://localhost:3001",
      "https://nextjs-social-app-one.vercel.app",
    ];
    
    // 2. Apply CORS immediately with explicit settings
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    }));
    
    // 3. MANUAL PREFLIGHT HANDLER (The "Secret Sauce")
    // This interceptor returns a 200 OK for every OPTIONS request 
    // before your database or routes even try to load.
    app.options("*", (req, res) => {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
      res.sendStatus(200);
    });

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
