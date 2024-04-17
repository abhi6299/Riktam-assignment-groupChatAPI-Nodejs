import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import { ObjectId } from 'mongodb';

const userModel = mongoose.model('users',userSchema);

export class UserRepository{
//All below function deal with operation on Databases but working inline with User controller
    async register(name,email,password,gender,admin,blacklisttoken){
        try{
            const newUser = new userModel({name:name, email:email, password:password, gender:gender,admin:admin,blacklistToken:blacklisttoken});
            const savedUser = await newUser.save();
            return savedUser;
        }catch(err){
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }
            else{
                throw new ApplicationError("Something went wrong in signup database",500);
            }
        }
    }
    async findByEmail(email){
        try{
            return await userModel.findOne({email});
        }catch(err){
            console.log(err);
                // throw new ApplicationError("Something went wrong in signup database",500);
        }
    }
    async setToken(id,token){
        try{
            const user = await userModel.findOneAndUpdate({_id:new ObjectId(id)},{blacklistToken:token});
            const savedToken=await user.save();
            return savedToken;

        }catch(err){
            console.log(err);
        }
    }

    async updateDetails(userID,name,email,hashedpswd,gender,admin){
        try{
            const user = await userModel.findById(userID);
            console.log(email);
            if(user){
                if(name!=undefined) user.name=name;
                if(email!=undefined) user.email=email;
                if(hashedpswd!=undefined) user.password=hashedpswd;
                if(gender!=undefined) user.gender=gender;
                if(admin!=undefined) user.admin=admin;
                const updatedUser = await user.save();
                return updatedUser;
            }else{
                return ' User Not found ';
            }
        }catch(err){
            console.log(err);
        }
    }
}