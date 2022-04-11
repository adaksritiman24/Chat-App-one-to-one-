const {Router} = require("express");
const User = require("../models/user");
const router = Router();
const Chats = require("../models/chats");
const { getChatRoomName } = require("../utils/utility");


router.post("/user", async(req,res)=> {
    const username = req.body.username;

    const user = User({
        name : username
    })
    try {
        await user.save();
        res.status(201).send({success: "new user created"});
    }
    catch {
        res.status(403).send({error:"user already exists"});
    }

});

router.post("/login",async(req,res)=> {
    const username = req.body.username;

    const foundUser = await User.findOne({name : username});

    if(foundUser) {
        return res.status(200).send();
    }

    res.status(403).send();
});

router.post("/connect", async(req, res)=> {
    const username1 = req.body.username1;
    const username2 = req.body.username2;

    if(username1 !== username2){
        try {
            const user1 = await User.findOne({name : username1});
            const user2 = await User.findOne({name : username2});

           
            if(!user1.connected_users.includes(user2._id)){
      
                user1.connected_users = [...user1.connected_users, user2._id];
                user2.connected_users = [...user2.connected_users, user1._id];
                await user1.save();
                await user2.save();
            }

        
            return res.status(200).send({
                success : "connection successful",
            });
        }
        catch(e) {
            return res.status(500).send({
                error : "internal server error",
            });
        }

    }

    return res.status(401).send({
        error : "cannot connect with same user"
    });

});


router.get('/connections/:un', async(req,res)=> {
    try {
        const username = req.params.un;
        const user = await User.findOne({name : username}).populate('connected_users');

        return res.status(200).send(user.connected_users);
    
    }
    catch(error) {
        return res.status(404).send();
    }

});

router.get("/chats", async(req, res)=>{
    try {
        const personA = req.query.A;
        const personB = req.query.B;
        
        const chatRoomName = getChatRoomName(personA, personB);

        const chatRoom = await Chats.findOne({chatroom : chatRoomName});
        if(!chatRoom) {
            return res.send([]);
        }
        return res.send(chatRoom.messages);
        
    }
    catch(e) {
        res.status(500).send();
    }
});




module.exports = router;