import express from 'express'
import { sendMessage } from "../controllers/message.controller.js"
import { protectRoute  } from "../middleware/protectRoute.js";

const router = express.Router()

//protect send message - only logged in user can send message
router.post("/send/:id",protectRoute, sendMessage)//this is receiver's id

export default router