import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository.js';

export class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    // Register logic ---------------------------------
    async register(req,res,next){
        try{
            const {name,email,password,gender,admin}=req.body;
            const hashedpswd = await bcrypt.hash(password,12);    
            const newUser = await this.userRepository.register(name,email,hashedpswd,gender,admin,'');
            res.status(201).send(newUser);
        }catch(err){
            console.log(err);
            res.status(400).send("Error occured while registering");
        }
    }
    // Login logic ---------------------------------
    async login(req,res,next){
        try{
            const {email,password}=req.body;
            const findUser = await this.userRepository.findByEmail(email);
            if(!findUser){
                res.status(400).send('Invalid Email');
            }
            else{
                const result = bcrypt.compare(password,findUser.password);
                if(result){
                    const token= jwt.sign({userID:findUser._id},process.env.JWT_SECRET,{
                        expiresIn: '1h',
                    })
                    return res.status(200).send(token);
                }else{
                    res.status(400).send('Invalid Credentials');
                }
            }
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while loggin in the user');
        }
    }
    // Logout logic ---------------------------------
    async logout(req,res,next){
        let responseSent = false; // Flag to track if a response has been sent
        try {
            const userID = req.userID;
            const token = req.headers["authorization"];

            const tokenSet = await this.userRepository.setToken(userID, token);
            console.log("Logout:", tokenSet.blacklistToken);

            // responseSent = true; // Set flag indicating response has been sent
            return res.status(200).send({ message: 'Logout successful' });
        } catch (err) {
            console.log(err);
            // if (!responseSent) { // Check if a response has already been sent
                return res.status(400).send('Error occurred while logging out the user');
            // }
        }
    }
    // Updating user details logic ---------------------------------
    async updateUserDetails(req,res,next){
        try{
            const userID=req.userID;
            // let name=undefined;
            // let email=undefined;
            // let password = undefined;
            // let gender= undefined;
            // let admin = undefined;
            const {name,email,password,gender,admin}=req.body;
            let hashedpswd = null;
            if(password){
                hashedpswd = await bcrypt.hash(password,12);    
            }
            const newUser = await this.userRepository.updateDetails(userID,name,email,hashedpswd,gender,admin);
            res.status(201).send(newUser);
        }catch(err){
            console.log(err);
            res.status(400).send("Error occured while updating details of the user");
        }
    }
}