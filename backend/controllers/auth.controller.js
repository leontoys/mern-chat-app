import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

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

export const login = (req, res) => {
    res.send("login user")
}

export const logout = (req, res) => {
    res.send("logout user")
}