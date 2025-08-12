const User = require("../models/user");
const adminController = async (req, res) => {
  try {
    const user = await User.find({},{password:0,__v:0,id:0});
    const admin  = await User.find({},{isAdmin:1})
    
    
    if(!user || !user.length === 0){
        return res.status(500).send({
            success:false,
            message:"some error unbale to fetch user"
        })
    }
    return res.status(200).send({
        success:true,
        message:"user data fetched succefully",
        user
    })
  } catch (error) {
    return res.status(400).send({
        success:false,
        message:"user unable to fetch "
    })
  }
};
module.exports = adminController;
