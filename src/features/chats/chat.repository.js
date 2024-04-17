import { ObjectId } from "mongodb";
import { chatSchema } from "./chat.schema.js";
import mongoose from "mongoose";
import { userSchema } from "../users/user.schema.js";

const chatModel = mongoose.model('chats',chatSchema);
const userModel = mongoose.model("users",userSchema);
export class ChatRepository{

//All below function deal with operation on Databases but working inline with Chat controller

    async findUser(userID){
        try{
            return await userModel.findOne({_id:new ObjectId(userID)});
        }catch(err){
            console.log(err);
        }
    }
    async findMsg(msgID){
        try{
            return await chatModel.findOne({_id:new ObjectId(msgID)});
        }catch(err){
            console.log(err);
        }
    }
    async addMessage(userID,username,text,timestamp){
        try{
            const msgAdd = new chatModel({userID:userID, username:username, text:text, timestamp:timestamp});
            const savedMsg = await msgAdd.save();
            return savedMsg;
        }catch(err){
            console.log(err);
        }
    }
    async deleteMessage(userID,msgID){
        try{
            const delMsg = await chatModel.deleteOne({_id:new ObjectId(msgID), userID:new Object(userID)});
            return delMsg;
        }catch(err){
            console.log(err);
        }
    }
    async likeMsg(userID,msgID){
        try{
            const msg = await chatModel.findById(msgID);
            if(msg.likes.includes(userID)){
                return msg;
            }else{
                msg.likes.push(userID);
                const savedMsg = await msg.save();
                return savedMsg;
            }

        }catch(err){
            console.log(err);
        }
    }
    async commentMsg(userID,msgID,comment){
        try{
            const msg = await chatModel.findById(msgID);
            const user = await userModel.findById(userID);
            msg.comment.push({name:user.name, comment:comment});
            const addedComment = await msg.save();
            return addedComment;
        }catch(err){
            console.log(err);
        }
    }
    async search(userID,id){
        try{
            const arr= await chatModel.find({userID:new ObjectId(id)}).exec();
            return arr;
        }catch(err){
            console.log(err);
        }
    }
}