import  express from "express";
import { listCourses, getCourseById } from "../controllers/courseController";
const router = express.Router();
router.get("/", listCourses);
router.get("/:courseId", getCourseById);

export default router;