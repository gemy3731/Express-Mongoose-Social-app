import type { Express } from "express";
import connectDB from "./db/connection.ts";
import authRouter from "./modules/authModule/auth.routes.ts";

const bootstrap = async (express: typeof import("express"), app: Express) => {
  app.use(express.json());
  
  await connectDB();

  app.use("/auth",authRouter)

  app.use((_, res) => {
    res.status(404).send("Page not found");
  });
};

export default bootstrap;
