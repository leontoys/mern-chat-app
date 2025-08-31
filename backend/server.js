import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectDB from './db/connect.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())//parse request.body
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`app running on PORT ${PORT}`)
})