import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getSideBarUsers } from "../controllers/user.controller.js";


const router = express.Router()

router.get("/", protectRoute, getSideBarUsers)

export default router