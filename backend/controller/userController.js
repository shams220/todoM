const mongoose = require('mongoose');
const User  = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const register = async(req,res)=>{
// res.send("register worrking")
try{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(500).send({
            message:"please enter all the details",
            success:false
        })
    }
    const registeredUser = await User.findOne({email});
    if(registeredUser){
        return res.status(500).send({
            message:"User already registered! Please login"
            ,success:false
        })
    }
const hashedPassword  = await bcrypt.hash(password,10);
const user = new User({
    username,email,
    password:hashedPassword
})
user.save();
return res.status(200).send({
    succes:true,
    message:"User registered succesfully"
})

}catch(error){
    res.status(404).send({
        success:false,
        message:`Error: ${error.message}`
    })
}

}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // 400 = Bad Request for missing info
      return res.status(400).send({
        success: false,
        message: "Please enter all the details"
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // 401 = Unauthorized for invalid credentials
      return res.status(401).send({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Correct reference to password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      const token = jwt.sign(
        { userID: existingUser._id },
        "SECRET_KEY",
        { expiresIn: "30d" }
      );
      return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        token,
        user:{
          userID:existingUser._id,
          email:existingUser.email,
          usernam:existingUser.username
        }
      });
    } else {
      // Also 401 (not 404)
      return res.status(401).send({
        success: false,
        message: "Invalid email or password"
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`
    });
  }
}


module.exports = {register,login}