const pdf = require("pdf-parse")
const { generateInterviewReport, generateInterviewSection, generateRoadmapForDays, generateATSResume } = require("../services/ai.service")
const InterviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" })
        }

        if (!resumeFile && !selfDescription) {
            return res.status(400).json({ message: "Resume file or self description is required" })
        }

        let resumeText = ""
        if (resumeFile) {
            const pdfData = await pdf(resumeFile.buffer);
            resumeText = pdfData.text;
        }

        const interviewReportByAi = await generateInterviewReport({
            resumeData: {
                resumeContent: resumeText,
                selfDescription,
                jobDescription
            }
        })

        const interviewReport = await InterviewReportModel.create({
            user: req.user.id,
            jobDescription,
            selfDescription,
            resume: resumeText,
            matchScore: interviewReportByAi.matchScore,
            technicalQuestions: interviewReportByAi.technicalQuestions || [],
            behavioralQuestions: interviewReportByAi.behavioralQuestions || [],
            skillGaps: interviewReportByAi.skillGaps || [],
            preparationPlan: interviewReportByAi.preparationPlan || []
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })
    } catch (error) {
        console.error("Error in generateInterviewReportController:", error)
        res.status(500).json({ message: error.message })
    }
}

async function generateInterviewSectionController(req, res) {
    try {
        const { section, selfDescription, jobDescription } = req.body
        const allowedSections = ['technicalQuestions', 'behavioralQuestions', 'skillGaps', 'preparationPlan']

        if (!section || !allowedSections.includes(section)) {
            return res.status(400).json({ message: 'Invalid or missing section' })
        }

        const sectionItem = await generateInterviewSection({
            resumeData: {
                selfDescription: selfDescription || '',
                jobDescription: jobDescription || '',
                resumeContent: req.body.resumeContent || '' // In case resume content was saved/passed
            },
            section
        })

        res.status(200).json(sectionItem)
    } catch (error) {
        console.error("Error in generateInterviewSectionController:", error)
        res.status(500).json({ message: error.message })
    }
}

async function generateRoadmapForDaysController(req, res) {
    try {
        const { days, selfDescription, jobDescription } = req.body

        if (!days || ![7, 14, 21].includes(days)) {
            return res.status(400).json({ message: 'Invalid days: must be 7, 14, or 21' })
        }

        const roadmap = await generateRoadmapForDays({
            resumeData: {
                selfDescription: selfDescription || '',
                jobDescription: jobDescription || ''
            },
            days
        })

        res.status(200).json(roadmap)
    } catch (error) {
        console.error("Error in generateRoadmapForDaysController:", error)
        res.status(500).json({ message: error.message })
    }
}

async function generateATSResumeController(req, res) {
    try {
        const resumeFile = req.file
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" })
        }

        let resumeText = ""
        if (resumeFile) {
            const pdfData = await pdf(resumeFile.buffer);
            resumeText = pdfData.text;
        } else if (selfDescription) {
            resumeText = selfDescription
        } else {
            return res.status(400).json({ message: "Resume file or self description is required" })
        }

        const atsResume = await generateATSResume({
            resumeData: resumeText,
            jobDescription
        })

        res.status(200).json({ atsResume })
    } catch (error) {
        console.error("Error in generateATSResumeController:", error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { 
    generateInterviewReportController, 
    generateInterviewSectionController, 
    generateRoadmapForDaysController,
    generateATSResumeController
}
