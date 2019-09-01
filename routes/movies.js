const express = require('express');
const router = express.Router();
const movieModel = require('../mongo-db-movies');

async function getAllMovies(){
    return await movieModel.find();
}

async function getMovieById(id){
    return await movieModel.findById(id);
}

async function deleteMovieById(id){
    return await movieModel.deleteOne({_id:id});
}

async function updateCource(id,body){
    return await movieModel.findByIdAndUpdate({_id:id},
        {$set:body},{new:true})
}


//Get mapping to get all moveies
router.get('/',async (req,res)=>{
    try{
        const movies = await getAllMovies();
        res.send(movies);
    }catch(err){
        res.status(404).send(err.message);
    }
    
});

//Get mapping to get specific movies
router.get('/:id',async (req,res)=>{
    try{
        const movie = await getMovieById(req.params.id);
        res.send(movie);
    }catch(err){
        res.status(404).send(err.message);
    }
});

//Post mapping 
router.post('/',async (req,res)=>{
    const input = inputValidation(req);
    let movie;
    if(input){
        movie = new movieModel({
            name:req.body.name,
            author:req.body.author,
            tags:req.body.tags,
            isPublish:req.body.isPublish,
        })
    }
    else{
        res.status(404).send('Please send a valid movie');
    }

    try{
        const newMovie = await movie.save();
        res.send(newMovie);
    }
    catch(err){
        res.status(404).send(err.message);
    }
});

//Put mapping
router.put('/:id',async (req,res)=>{
    try{
      if(req.body){
       const updatedCource = await updateCource(req.params.id,req.body);
       res.send(updatedCource);
      }
    }catch(error){
        res.status(404).send(`${req.params.id} ${error.message}`);
    }
})

//Delete mapping
router.delete('/:id',async (req,res)=>{
    try{
       await deleteMovieById(req.params.id);
       res.send(`Movie with id ${req.params.id} deleted sucessfully`)
   }catch(err){
        res.status(404).send(err.message)
   }
});


//Custom input validation
const inputValidation = (req)=>{
    if(req.body.name !== "" 
    && req.body.genres !== ""){
        return true;
    }else{
        return false;
    }
}

module.exports = router;