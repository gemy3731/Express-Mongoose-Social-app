import type { Request, Response } from "express";
import { loginUser, registerUser } from "../../services/auth.service.ts";
import type { AuthRequest } from "../../middlewares/auth.middleware.ts";

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production"?"none" as const:"strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, dateOfBirth, gender,rePassword } = req.body;
    
    if (!email || !password || !name || !dateOfBirth || !gender || !rePassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if(password !== rePassword) return res.status(400).json({ error: "Passwords don't match" })
  
    const data = await registerUser(req.body);

    res.cookie("token", data.token, TOKEN_COOKIE_OPTIONS);

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

  res.cookie("token", data.token, TOKEN_COOKIE_OPTIONS);

  return res.status(200).json(data);
}catch(error:any){
  return res.status(500).json({ error: error.message });
}
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.status(200).json({ user: req.user });
};