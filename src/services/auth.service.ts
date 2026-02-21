import jwt from "jsonwebtoken";
import {
  type LoginCredentials,
  type RegisterCredentials,
  type AuthResponse,
  AuthErrorType,
} from "../types/auth.types.ts";
import User from "../db/models/User.model.ts";

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  try {
    const { email, password, name, dateOfBirth, gender } = credentials;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error(AuthErrorType.USER_EXISTS);
    }

    const user = await User.create({
      email,
      password,
      name,
      dateOfBirth,
      gender,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return {
      token,
      user: { id: user._id.toString(), email: user.email, name: user.name },
    };
  } catch (error:any) {
    throw new Error(error);
  }
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const { email, password } = credentials;

    const user = await User.findByEmail(email);
    if (!user) throw new Error(AuthErrorType.INVALID_CREDENTIALS);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error(AuthErrorType.INVALID_CREDENTIALS);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return {
      token,
      user: { id: user._id.toString(), email: user.email, name: user.name },
    };
  } catch (error:any) {
    throw new Error(error);
  }
};
