import { Request, Response } from "express";
import UserCourseProgress from "../models/userCourseProgressModel";
import Course from "../models/courseModel";
import { calculateOverallProgress, mergeSections } from "../utils/utils";

export const getUserEnrolledCourses = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const enrolledCourses = await UserCourseProgress.query("userId")
      .eq(userId)
      .exec();
    const courseIds = enrolledCourses.map((item: any) => item.courseId);
    const courses = await Course.batchGet(courseIds);
    res.json({
      message: "User enrolled courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user enrolled courses",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUserCourseProgress = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  try {
    const progress = await UserCourseProgress.get({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        message: "Course progress not found",
      });
    }

    res.json({
      message: "User course progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user course progress",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateUserCourseProgress = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;
  const progressData = req.body;

  try {
    let updatedProgress = await UserCourseProgress.get({ userId, courseId });

    if (!updatedProgress) {
      updatedProgress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: progressData.sections || [],
        lastAccessedTimeStamp: new Date().toISOString(),
      });
    } else {
        progressData.sections = mergeSections(
            updatedProgress.sections,
            progressData.sections || []
        )
        updatedProgress.lastAccessedTimeStamp = new Date().toISOString();
        updatedProgress.overallProgress = calculateOverallProgress(progressData.sections);
    }

    await updatedProgress.save();

    res.json({
      message: "User course progress updated successfully",
      data: updatedProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user course progress",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
