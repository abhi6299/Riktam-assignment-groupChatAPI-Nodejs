import mongoose from 'mongoose';
// Schema for chat of the group
export const chatSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    username:String,
    text:String,
    timestamp:Date,
    likes:[{type:mongoose.Schema.Types.ObjectId}],
    comment:[{name:String, comment:String}]
})