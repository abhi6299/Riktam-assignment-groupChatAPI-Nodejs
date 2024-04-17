import express from 'express';
import './env.js';
import bodyParser from 'body-parser';
import userRouter from './src/features/users/user.route.js';
import { connectUsingMongoose } from './src/config/mongoose.config.js';
import groupRouter from './src/features/group/group.route.js';
import chatRouter from './src/features/chats/chat.route.js';

const server = express(); // starting the server

server.use(bodyParser.json()); // for parsing the json sent from postman in json format
server.use(express.urlencoded({extended:true}));

server.use('/api/user',userRouter); // user Route middleware
server.use('/api/group',groupRouter);// group Route middleware
server.use('/api/chat',chatRouter); // chat Route middleware

// server.get('/',(req,res)=>{
//     res.status(200).send("All ok");
// })

// Kindly use port 2100 for using the application
server.listen(2100,()=>{
    console.log("Server is listening on Port 2100!");
    connectUsingMongoose();
})

//Add validation check
//Add comments + SS
//Add explaination in mail -> tell what db used, git, postman, commetn ka documentation tell
//Add proper github repo + Documentation
