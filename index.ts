import express from "express";
import bootstrap from "./src/app.controller.ts";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
 
const app = express();

const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.use(
      cors({
        origin: "http://localhost:3001",
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
