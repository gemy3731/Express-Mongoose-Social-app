import type { Express } from "express";
import connectDB from "./db/connection.ts";
import authRouter from "./modules/authModule/auth.routes.ts";
import postRouter from "./modules/postModule/post.routes.ts";
import cookieParser from "cookie-parser";

const bootstrap = async (express: typeof import("express"), app: Express) => {
  app.use(express.json());
  app.use(cookieParser());
  await connectDB();

  app.use("/auth",authRouter)
  app.use("/post",postRouter)
  
  app.use((_, res) => {
    res.status(404).send("Page not found");
  });
};

export default bootstrap;
