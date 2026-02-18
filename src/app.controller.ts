import type { Express } from "express";
import { connect, syncModel } from "./db/connection.ts";
const bootstrap = async (express: typeof import("express"), app: Express) => {
  app.use(express.json());

  await connect();
  await syncModel();
  



  
  app.use((_,res)=>{res.status(404).send("Page not found")})
};

export default bootstrap;
