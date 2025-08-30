import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
    const{fullName,userName,password,confirmPassword,profilePic,gender} = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords dont match" });
  }

  const user = await User.findOne({ userName });
    if (user) {
    console.log(user.fullName,user.userName,user.password,user.gender,user.profilePic)
    return res.status(400).json({ error: "Username already exists" });
  }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

  const newUser = new User({
    fullName,
    userName,
    password : hashedPassword,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });
        
      if (newUser) {
        //generate JWT token
        generateTokenAndSetCookie(newUser._id,res)//will add a cookie in the response

     await newUser.save();

     res.status(201).json({
       _id: newUser._id,
       fullName: newUser.fullName,
       userName: newUser.userName,
       profilePic: newUser.profilePic,
     }); 
  } else {
    res.status(400).json({message:'Invalid user data'})
  }
    
    
} catch (error) {
        console.log('Error in signup controller', error)
        res.status(500).json({message:'Internal server error'})
}

}

export const login = async (req, res) => {
    try {
      const { userName, password } = req.body
      
      const user = await User.findOne({ userName })
      
      const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
      
      if (!isPasswordCorrect || !user) {
        res.status(400).json({message:'Invalid credentials'})
      }

      generateTokenAndSetCookie(user._id, res)
      
      res.status(200).json({
        _id: user._id,
        profilePic: user.profilePic,
        fullName: user.fullName,
        userName : user.userName
      })

    } catch (error) {
      console.log('Error in login controller', error)
      res.status(500).json({message:'Internal server error'})
    }
}

export const logout = (req, res) => {
    try {
      //clear cookie
      res.cookie("jwt", "", { maxAge: 0 })
      res.status(200).json({message:'Logged out successfully'})

    } catch (error) {
      console.log('Error in logout controller', error)
      res.status(500).json({message:'Internal server error'})
    }
}