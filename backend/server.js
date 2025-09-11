import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectDB from './db/connect.js'
import cookieParser from 'cookie-parser'
import { app, server } from "./socket/socket.js";
import path from "path"

dotenv.config()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())//parse request.body
app.use(cookieParser())//to pare cookies 
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

//after routes add middleware
app.use(express.static(path.join(__dirname,"/frontend/dist")))//to serve static files like html,css,js,soundfiles

//run front end from here
  app.get(/(.*)/, (req, res) => {
    //NOTE- app.get("*") doesn't work in node5 and above
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
  });

server.listen(PORT, () => {
    connectDB()
    console.log(`app running on PORT ${PORT}`)
})