const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const connectToDB = require("./config/database")

const app = express()

// Connect to database
connectToDB()

app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    process.env.CORS_ORIGIN,
    "http://localhost:5173",
    "http://localhost:5174",
    "https://gen-ai-job-prepairation.vercel.app" // User's specific production URL
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// require all the route here

 const authRouter = require ("./routes/auth.routes")
 const interviewRouter = require ("./routes/interview.routes")

// using all the routes
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)

app.get("/", (req, res) => {
    res.json({ message: "Gen AI Job Preparation API is running..." })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    })
})


module.exports = app