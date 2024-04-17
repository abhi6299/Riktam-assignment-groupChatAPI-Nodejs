import mongoose from 'mongoose';
// Schema for Users
export const userSchema = new mongoose.Schema({
    name:{type:String, required:true, maxLength: 25},
    email: {type: String, required:true,
        match: [/.+\@.+\../,"Please enter a valid email"]   },
    password:{type:String},
    gender:{type:String},
    admin:{type:Boolean},
    blacklistToken:{type:String},
})
// export const userModel = mongoose.model('users',userSchema);