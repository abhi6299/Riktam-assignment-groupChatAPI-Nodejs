import { ChatRepository } from "./chat.repository.js";

export class ChatController{
    constructor(){
        this.chatRepository = new ChatRepository();
    }
    // To add a msg in the group -----------------------------------------------
    //Note: any added user can send msg in the group
    async addMsg(req,res,next){
        try{
            const userID=req.userID;
            // console.log(userID);
            const {text}  = req.body;
            const user = await this.chatRepository.findUser(userID);
            const username = user.name;
            // console.log(user.name);
            const timestamp = new Date();
            const msgAdded = await this.chatRepository.addMessage(userID,username,text,timestamp);
            return res.status(200).send(msgAdded);
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while texting in the group');
        }
    }
    //To delete msg from the group ----------------------------------------
    //Note: User can only delete his/her own msg not of any other user
    async deleteMsg(req,res,next){
        try{
            const userID=req.userID;
            const msgID  = req.body.id;
            const msgPresent = await this.chatRepository.findMsg(msgID);
            //Check that whether the user is trying to del his/her own msg from the group
            if(msgPresent.userID == userID){ 
                const deletedMsg = await this.chatRepository.deleteMessage(userID,msgID);
                return res.status(200).send(deletedMsg);
            }else{
                return res.status(400).send("You cannot delete other's msgs in this chat");
            }
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while deleting msg in the group');
        }
    }
    //To like a msg present in the group
    //Note: Any user can like any user's msg but only once(check has been added for it)
    async likeMsg(req,res,next){
        try{
            const userID=req.userID;
            const msgID  = req.body.id;
            const likeMsg = await this.chatRepository.likeMsg(userID,msgID);
            return res.status(200).send(likeMsg);
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while liking a message');
        }
    }
    //To cooment on a msg present in the group
    //Note: Any user can comment on any user's msg
    async commentMsg(req,res,next){
        try{
            const userID=req.userID;
            const msgID  = req.body.id;
            const comment = req.body.comment;
            const commentMsg = await this.chatRepository.commentMsg(userID,msgID,comment);
            return res.status(200).send(commentMsg);
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while commenting on a message');
        }
    }
    //To search any user's chat using that persons userId
    //Note: Any user(Normal/Admin) can do this task
    async searchChat(req,res,next){
        try{
            const userID = req.userID;
            const id = req.body.id;
            const chatsArr = await this.chatRepository.search(userID, id);
            return res.status(200).send(chatsArr);
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while searching the users chat');
        }
    }
}