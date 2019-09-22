const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {userModel} = require('../models/user');


router.get('/current',auth,async(req,res)=>{
   const user = await userModel.findById(req.user._id).select('-password -_id -__v');
   res.send(user);
});


router.post('/',async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});

    if(user) return res.status(400).send('user already exists');

    let newUser = new userModel(_.pick(req.body,['name','email','password']))
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password,salt);
    await newUser.save();
    const token = jwt.sign({_id:newUser._id},'Root#123');
    res.header('authHeader',token).send(_.pick(newUser,['_id','name','email']));

})


module.exports = router;

