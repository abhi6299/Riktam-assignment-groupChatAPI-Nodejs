import mongoose from 'mongoose';

// Schema for User present in a Group
export const groupSchema = new mongoose.Schema({
    admin:{type:mongoose.Schema.Types.ObjectId},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
})
// export const userModel = mongoose.model('users',userSchema);