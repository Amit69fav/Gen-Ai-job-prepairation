const express = require('express');
const authUser = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")


const interviewRouter = express.Router();
/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the candidate's resume and job description
 * @access Private
 * @body { resumeData: Object }
 * @returns { matchScore: number, technicalQuestions: Array, behavioralQuestions: Array, skillGaps: Array, preparationPlan: Array }
 */
interviewRouter.post("/", authUser, upload.single("resume"), interviewController.generateInterviewReportController)
interviewRouter.post("/more", authUser, interviewController.generateInterviewSectionController)
interviewRouter.post("/roadmap", authUser, interviewController.generateRoadmapForDaysController)
interviewRouter.post("/ats-resume", authUser, upload.single("resume"), interviewController.generateATSResumeController)

module.exports = interviewRouter