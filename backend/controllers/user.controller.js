import User from "../models/user.model.js"

export const getSideBarUsers = async (req, res) => {
    try {
        
        const loggedInUser = req.user._id

        //now we have to find all users except this user
        const users = await User.find({_id : {$ne:loggedInUser}})

        res.status(200).json(users)

    } catch (error) {
        console.error('Error in user controller', error)
        res.status(500).json({message:'Internal Server Error'})
    }
}