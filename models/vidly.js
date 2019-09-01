const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{type:String,required:true}
})
const genreModel = mongoose.model('genre',genreSchema);

const vidlySchema = new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:genreSchema,required:true},
    numberInStock:{type:Number},
    dailyRentalRate:{type:Number}
});
const vidlyModel = mongoose.model('vidly',vidlySchema);



exports.vidlyModel = vidlyModel;
exports.genreModel = genreModel;