import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectDB from './db/connect.js'
import cookieParser from 'cookie-parser'
import { app, server } from "./socket/socket.js";

dotenv.config()
const PORT = process.env.PORT || 5000

app.use(express.json())//parse request.body
app.use(cookieParser())//to pare cookies 
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users",userRoutes)

server.listen(PORT, () => {
    connectDB()
    console.log(`app running on PORT ${PORT}`)
})