import express from "express";
import "dotenv/config";
import bootstrap from "./src/app.controller.ts";

const app = express();

const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    await bootstrap(express, app);
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
