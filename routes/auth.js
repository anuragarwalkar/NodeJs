const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const _ = require('lodash');
const {userModel} = require('../models/user');

router.post('/',async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});

    if(!user) return res.status(400).send('invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send('invalid password');

    const token = jwt.sign({_id:user._id},'Root#123');

    res.send(token);

});



module.exports = router;

