import express from 'express'
import { UserController } from './user.controller.js';
import jwtAuth from '../../middlewares/auth.middleware.js';
import blacklistedToken from '../../middlewares/blacklistedToken.middleware.js';

var userControl = new UserController();
const userRouter = express.Router();
// Route for registering the user
userRouter.post('/register',(req,res,next)=>{
    userControl.register(req,res,next);
});
// Route for logging user into the Application
userRouter.post('/login',(req,res,next)=>{
    userControl.login(req,res,next);
});
// Route for loggin out of the Application
userRouter.get('/logout',jwtAuth,blacklistedToken,(req,res,next)=>{
    userControl.logout(req,res,next);
});
//To update details of the already registered user
userRouter.post('/update',jwtAuth,(req,res,next)=>{
    userControl.updateUserDetails(req,res,next);
})


export default userRouter;