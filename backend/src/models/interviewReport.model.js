const mongoose = require("mongoose")





/**
 * -job description schema : String
 * -resume text : String
 * -self description : String
 * 
 * -matchscore :number
 * 
 * -technical questions :
 *      [{ question:"",
 *          intention:"",
 *          answer:"",
 *         }]
 * -behavioral questions:[
 *      { question:"",
 *          intention:"",
 *          answer:"",
 *         }]
 * -skill gaps:[{
 *              skill:""
 *              serverity:{
 *                  type:String,
 *                  enum: ["low","medium","high"]}
 * }]
 * preparation plan:[{
 *                     day:Number,
 *                      focus:String,
 *                      tasks:[String] }]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
},{
    _id: false
});

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
},{
    _id: false
});

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
},{
    _id: false
});

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "focus is required"]
    },
    tasks: {
        type: [String],
        required: [true, "tasks are required"]
    }
},{
    _id: false
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "job description is required"]
    },
    resume:{
        type: String,
    },
    selfDescription:{
        type: String,
    },
    matchScore:{
        type: Number,
        min: [0, "match score cannot be less than 0"],
        max: [100, "match score cannot be greater than 100"]
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user reference is required"]
    }
},{
    timestamps:true
})


const InterviewReportModel = mongoose.model("interviewReports", interviewReportSchema)
module.exports = InterviewReportModel