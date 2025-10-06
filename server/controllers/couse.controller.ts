import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import { redis } from "../utils/redis";
import sendMail from "../utils/sendMail";
// import { createCourse, getAllCoursesService } from "../services/course.service";
// import CourseModel, { IComment } from "../models/course.model";
// import NotificationModel from "../models/notification.Model";
// import axios from "axios";


// upload course
export const uploadCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        

       } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
    }
)