const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name:String,
    title:String,
    genre: {},
    date: Date,
    isPublish:Boolean,
});

const movieModel = mongoose.model('movie',moviesSchema);

module.exports = movieModel