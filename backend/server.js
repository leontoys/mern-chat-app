import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectDB from './db/connect.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.get("/", (req, res) => {
    res.send('Hello World')
})
app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`app running on PORT ${PORT}`)
})