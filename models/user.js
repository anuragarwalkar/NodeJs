const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this.id},'Root#123');

    return token;
}

const userModel = new mongoose.model('user',userSchema);


exports.userModel = userModel;