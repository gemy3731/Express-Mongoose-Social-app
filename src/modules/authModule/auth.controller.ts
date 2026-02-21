import type { Request, Response } from "express";
import { loginUser, registerUser } from "../../services/auth.service.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, dateOfBirth, gender,rePassword } = req.body;

    if (!email || !password || !name || !dateOfBirth || !gender || !rePassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if(password !== rePassword) return res.status(400).json({ error: "Passwords don't match" })
  
    const data = await registerUser(req.body);
  
    return res.status(201).json(data);
  }catch(error:any){
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try{
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const data = await loginUser(req.body);
  return res.status(200).json(data);
}catch(error:any){
  return res.status(500).json({ error: error.message });
}
};
