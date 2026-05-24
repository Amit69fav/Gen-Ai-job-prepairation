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
app.use(cors({
    origin: [
        process.env.CORS_ORIGIN,
        "http://localhost:5173",
        "http://localhost:5174",
        ""
    ].filter(Boolean),
    credentials: true
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