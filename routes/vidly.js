const express = require('express');
const {vidlyModel,genreModel} = require('../models/vidly');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('hello anurag');
});

router.post('/',async (req,res)=>{
   const userForm = req.body;

   const genre = await genreModel.findById(userForm.genre);

   const vidly = new vidlyModel({
    title:userForm.title, 
    //   genre:new genreModel({name:userForm.genre}),
    //   genre:userForm.genre,
      genre:{name:genre.name},
      numberInStock:userForm.numberInStock,
      dailyRentalRate:userForm.dailyRentalRate 
   })

   const createdObj = await vidly.save();

   res.send(createdObj);
//    res.send(genre);
});

router.post('/genre',async (req,res)=>{
    const userForm = req.body;
 
    const vidly = new genreModel({
        name:userForm.name
    })
 
    const createdObj = await vidly.save();
 
    res.send(createdObj);
 });



module.exports = router;