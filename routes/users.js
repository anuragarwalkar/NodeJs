const express = require('express');
const router = express.Router();
const {userModel} = require('../models/user')

router.post('/',async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});

    if(user) return res.status(400).send('user already exists');

    let newUser = new userModel({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    await newUser.save();

    res.send(newUser);

})


module.exports = router;

