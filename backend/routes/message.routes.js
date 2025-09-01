import express from 'express'
import { sendMessage, getMessages } from "../controllers/message.controller.js"
import { protectRoute  } from "../middleware/protectRoute.js";

const router = express.Router()

router.get("/:id",protectRoute,getMessages)//get messages between logged in user and person to chat
//protect send message - only logged in user can send message
router.post("/send/:id",protectRoute, sendMessage)//this is receiver's id

export default router