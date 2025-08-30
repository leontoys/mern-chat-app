import User from "../models/user.model.js"

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

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

  const newUser = new User({
    fullName,
    userName,
    password,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });

  await newUser.save();

  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    userName: newUser.userName,
    profilePic: newUser.profilePic,
  });
    
    
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