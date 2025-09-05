import { sectionSchema } from "./../../../asset-download/client/lib/schemas";
import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Course from "../models/courseModel";
import Transaction from "../models/transactionModel";
import UserCourseProgress from "../models/userCourseProgressModel";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// payment intent is created when user wants to make a payment
export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50; // 50 cents minimum
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    // send client secret to the frontend so we can use it for information
    res.json({
      message: "Payment intent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

  try {
    // Create a new transaction in the database

    // 1.got course info
    const course = await Course.get(courseId);

    // 2. create transaction record
    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider,
    });
    await newTransaction.save();

    // 3. create user course progress
    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: course.sections.map((section: any) => ({
        sectionId: section.sectionId,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.chapterId,
          cpmpleted: false,
        })),
      })),
      lastAccessedTimestamp: new Date().toISOString(),
    });
    await initialProgress.save();

    // 4. add user enrollement to course
    await Course.update(
        {courseId},
        {
            $ADD: {
                enrollments: [{userId}]
            }
        }
    )
    res.json({
        message: "Purchase successful and course enrolled",
        data: {
            transaction: newTransaction,
            courseProgress: initialProgress,
        }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction and enrollment", error });
  }
};
