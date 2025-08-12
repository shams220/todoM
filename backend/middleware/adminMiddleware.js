const User = require("../models/user");
const mongoose = require("mongoose");
const adminMiddleware = async (req, res, next) => {
  try {

   const admin = await User.find({},{isAdmin:1});
 
   if(!admin){
    return res.status(500).send({
        success:false,
        message:"no admin found"
    })
   }
   if(admin.isAdmin === true){
    return res.status(200).send({
        success:true,
        message:"Admin Authentication Done✅",
        
    })
   }


   
    next()
} catch (error) {
        console.log(error);
    }
};
module.exports = adminMiddleware;
