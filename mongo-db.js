const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));

db.once('open',()=>{
    console.log('Connected to database');
});

const moviesSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags: [String],
    date: Date,
    isPublish:Boolean,
});

const movieModel = mongoose.model('movie',moviesSchema);

module.exports = movieModel
