import express from 'express';
import jwtAuth from '../../middlewares/auth.middleware.js';
import { ChatController } from './chat.controller.js';

const chatControl = new ChatController();
const chatRouter = express.Router();
//Route for Adding a msg in the group chat
chatRouter.post('/addMsg',jwtAuth,(req,res,next)=>{
    chatControl.addMsg(req,res,next);
})
//Route for Deleting a message in the group chat
chatRouter.delete('/deleteMsg',jwtAuth,(req,res,next)=>{
    chatControl.deleteMsg(req,res,next);
})
//API Route for liking a message
chatRouter.post('/like',jwtAuth,(req,res,next)=>{
    chatControl.likeMsg(req,res,next);
})
//API Route for commenting on a message in the group chat
chatRouter.post('/comment',jwtAuth,(req,res,next)=>{
    chatControl.commentMsg(req,res,next);
})
//API Route for searching any user's chat in the group
chatRouter.get('/search',jwtAuth,(req,res,next)=>{
    chatControl.searchChat(req,res,next);
})

export default chatRouter;