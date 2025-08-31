import jwt from "jsonwebtoken"
import User from "../models/user.model"

export const protectRoute = (req, res, next) => {
    
    //first get the token from the cookies 
    //for this we need cookie parser to be added as middleware in server.js
    try {

        const token = req.cookies.jwt 

        if (!token) {
            return res.status(401).json({message:'Not authorized'})
        }

        //decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!decoded) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        //find the user from the decoded token
        const user = User.findById(decoded.userId).select("-password")//because that's how we generated the token
        //also remove password

        if (!user) {
            return res.status(401).json({message:'User not found'})
        }

        req.user = user //attach user to the request object ie, logged in sender id

        next()
        
    } catch (error) {
        console.error('Error in protect Route', error)
        res.status(500).json({ message : 'Internal server error '})
    }
}