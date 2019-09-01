const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('err',console.error.bind(console,'connection error'));

db.once('open',()=>{
    console.log('connected to database');
});


