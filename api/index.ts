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

    app.use(cors({
      origin: "https://nextjs-social-app-one.vercel.app", // Use the specific string, not a function, to test first
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));
    
    // 3. Explicitly handle OPTIONS requests
    app.options("*", (req, res) => {
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
