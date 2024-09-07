import user from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs'

export const test = (req, res) => {
  res.json({
    message: "Hello World!",
  });
};

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your account'));

    try {
      if(req.body.password){
        req.body.password =  bcrypt.hashSync(req.body.password,10);
    }
    const updatedUser = await user.findByIdAndUpdate(req.params.id,{
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar

      }
    },{new:true})
    // console.log(updatedUser);
    
    if(!updateUser){
      return next(errorHandler(404,'User not found'))
    }

    const {password,...rest} = updatedUser._doc;

    res.status(200).json(rest);

    } catch (error) {
      next(error)
    }

    
}