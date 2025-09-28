require("dotenv").config();
import userModel from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import jwt, { Secret } from "jsonwebtoken";
import sendMail from "../utils/sendMail";
import ejs from "ejs";
import path from "path";

// register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      // check if email already exists
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }

      // temporary user object (not saved yet)
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      // create activation token
      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = {user: {name: user.name}, activationCode};
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
        
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }

      //  send response to frontend
      res.status(201).json({
        success: true,
        message: "Please check your email for activation code",
        activationToken: activationToken.token,
        activationCode: activationToken.activationCode, // usually email me send karte ho
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// activation token interface
interface IActivationToken {
  token: string;
  activationCode: string;
}

// function to create activation token + code
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m", // token valid for 5 minutes
    }
  );

  return { token, activationCode };
};
