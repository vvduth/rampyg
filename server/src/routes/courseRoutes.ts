import express from "express";
import {
  listCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getUploadVideoUrl,
} from "../controllers/courseController";
import { requireAuth } from "@clerk/express";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", listCourses);
router.post("/", requireAuth(), createCourse);

router.get("/:courseId", getCourseById);
router.put("/:courseId", requireAuth(), upload.single("image"), updateCourse);

router.delete("/:courseId", requireAuth(), deleteCourse);
router.post(
  "/:courseId/sections/:sectionId/chapters/:chapterId/get-upload-url",
  requireAuth(),
  getUploadVideoUrl
);
export default router;
