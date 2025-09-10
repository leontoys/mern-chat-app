import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}

//return receiver's socket id
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on("connection", (socket) => {
  console.log("user connected", socket.id)
  
  //read from frontend query
  const userId = socket.handshake.query.userId

  if (userId != "undefined") userSocketMap[userId] = socket.id
  
  //send events to all connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

//listening to event from the front end
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id)
      delete userSocketMap[userId]
      io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {app,io,server}