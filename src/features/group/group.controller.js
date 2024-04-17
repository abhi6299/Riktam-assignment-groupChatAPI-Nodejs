import { GroupRepository } from './group.repository.js';

export class GroupController{
    constructor(){
        this.groupRepository = new GroupRepository();
    }
    // To add self to the group ----------------------------------------------
    //Note: A normal user cannot add self to the group
    //Note: A admin user can add self to the group
    async addSelf(req,res,next){
        try{
            const userID=req.userID;
            // console.log(userID);
            const user = await this.groupRepository.findUser(userID);
            const isPresent = await this.groupRepository.findUserInGroup(userID);
            if(isPresent){
                return res.status(200).send('You are alreayd present in the group');
            }
            // console.log(user);
            if(user.admin){
                const userAdded = await this.groupRepository.addUser(userID,userID);
                res.status(201).send("You have Joined the Group Admin :)");
            }else{
                res.status(400).send('You have to be admin for joining the group OR ask admin to add you to the group');
            }
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while adding Self to the Group Chat');
        }
    }
    // To delete self to the group ----------------------------------------------
    //Note: Any user can del self from the group
    async delSelf(req,res,next){
        try{
            const userID=req.userID;
            console.log(userID);
            const user = await this.groupRepository.findUserInGroup(userID);
            console.log(user);
            if(user){
                const delUserSelf = await this.groupRepository.removeUser(userID);
                return res.status(201).send("You left the Group!");
            }else{
                return res.status(201).send("You are not there in the group");
            }
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while leaving the chat');
        }
    }
    // To add a registered user to to the group ---------------------------------------
    //Note: Only admin user can do this operation
    async addUser(req,res,next){
        try{
            const userID=req.userID;
            const user = await this.groupRepository.findUser(userID);
            if(user.admin){
                const userToBeAddedID = req.body.id;
                const userAdded = await this.groupRepository.addUser(userID,userToBeAddedID);
                res.status(201).send(userAdded);
            }else{
                res.status(400).send('You have to be admin for adding a new user to the group');
            }
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while adding the user by admin');
        }
    }
    //To remove a user from the group -------------------------------------------
    //Note: Only admin user can remove any user from the group
    async delUser(req,res,next){
        try{
            const userID= req.userID;
            const user = await this.groupRepository.findUser(userID);
            if(user.admin){
                const userToBeRemoved = req.body.id; // No need to check whether this id person is there or not as admin can  only delete if the person is added 
                const userRemoved = await this.groupRepository.removeUser(userToBeRemoved);
                res.status(201).send(userRemoved);
            }else{
                res.status(200).send("You are not admin. You cannot remove any user");
            }
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while removing the user by admin');
        }
    }
    // To search a user in the group
    //Note: Any user can search for any user in the group
    async searchUser(req,res,next){
        try{
            const userID= req.userID;
            const searchID = req.body.id;
            const searchedUser = await this.groupRepository.search(userID, searchID);
            return res.status(200).send(searchedUser);
        }catch(err){
            console.log(err);
            res.status(400).send('Error occured while searching the user');
        }
    }
}