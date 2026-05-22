const dotenv = require("dotenv")
dotenv.config()

const app = require("./src/app")
const connectToDB = require("./src/config/database")

const PORT = process.env.PORT || 3000

// On Vercel, the DB connection should be handled within the request flow or via a global promise
// but for a quick fix, we call it here. Vercel doesn't use app.listen in serverless mode.
connectToDB()

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

module.exports = app
