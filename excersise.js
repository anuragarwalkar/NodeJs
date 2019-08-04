const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection-error'));

db.once('open',()=>{
    console.log('connected');
});

const courceSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:Date,
    isPublished:Boolean,
    price:Number
});

const Cource = mongoose.model('courses',courceSchema);

async function getCourcses(){
const courses = await Cource.find({isPublished:true}).or([{price:{$gte:15}},{name:/.*by.*/i}]).sort('-price').select('name author price');
    console.log(courses)
}

getCourcses()

