require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// parse environment variables (default 300 min for access, 1200 min for refresh)
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);   // minutes
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10); // minutes

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000), // minutes → ms
  maxAge: accessTokenExpire * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 60 * 1000),
  maxAge: refreshTokenExpire * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

export const sendToken = async (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // ✅ upload session to redis (always await)
  await redis.set(user.id, JSON.stringify(user));

  if (process.env.NODE_ENV === "production") {  
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    refreshToken,
  });
};
