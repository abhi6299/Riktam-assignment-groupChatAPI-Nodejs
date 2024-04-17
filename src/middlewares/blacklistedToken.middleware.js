import { userSchema } from '../features/users/user.schema.js';
import mongoose from 'mongoose';
const userModel = new mongoose.model('User',userSchema);

// This middleware is to aid when a user has logged out, It will ensure once the user 
//has logged out he is unable to login with the same token and has to login again 

const blacklistedToken = async (req,res,next) => {

    const token = req.headers["authorization"];
    try{
        const user = await userModel.findOne({_id: new Object(req.userID)});
        // console.log(user);
        if(user.blacklistToken == token){
            return res.status(401).send('You are logged out, Please login again to generate new token');
        }
    }catch(err){
        console.log(err);
        return res.status(401).send('Unauthorized access for the user while logging out- in blacklist middleware');
    }
    next();
}

export default blacklistedToken;