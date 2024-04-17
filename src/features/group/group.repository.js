import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { groupSchema } from "./group.schema.js";
import { userSchema } from "../users/user.schema.js";

const groupModel = mongoose.model('groups',groupSchema);
const userModel = mongoose.model('users',userSchema);

export class GroupRepository{
//All below function deal with operation on Databases but working inline with Group controller
    async findUser(userID){
        try{
            return await userModel.findById(userID);
        }catch(err){
            console.log(err);
        }
    }
    async findUserInGroup(userID){
        try{
            return await groupModel.findOne({user:new ObjectId(userID)});
        }catch(err){
            console.log(err);
        }
    }

    async addUser(userID,userToBeAdded){
        try{
            const newUser = new groupModel({admin:new ObjectId(userID), user:new ObjectId(userToBeAdded)})
            const addedUser = await newUser.save();
            return addedUser;
        }catch(err){
            console.log(err);
        }
    }

    async removeUser(userID){
        try{
            const userDeleted = await groupModel.deleteOne({user:new Object(userID)});
            return userDeleted
        }catch(err){
            console.log(err);
        }
    }

    async search(userID, searchID){
        try{
            const userInGrp = await groupModel.findOne({user:searchID});
            if(userInGrp){
                const user = await userModel.findById(searchID);
                return user;
            }else{
                return 'No such user present in the group'
            }
        }catch(err){
            console.log(err);
        }
    }
}