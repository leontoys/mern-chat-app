import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    
    //first get the token from the cookies 
    //for this we need cookie parser to be added as middleware in server.js
    try {

        const token = req.cookies.jwt 
        console.log("token",token)

        if (!token) {
            return res.status(401).json({message:'Not authorized'})
        }

        //decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded",decoded)
        
        if (!decoded) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        //find the user from the decoded token
        const user = await User.findById(decoded.userId).select("-password")//because that's how we generated the token
        //also remove password

        if (!user) {
            return res.status(401).json({message:'User not found'})
        }

        req.user = user //attach user to the request object ie, logged in sender id

        console.log("user",req.user._id)

        next()
        
    } catch (error) {
        console.error('Error in protect Route', error)
        res.status(500).json({ message : 'Internal server error '})
    }
}