const express = require('express');
const router = express.Router();

const movies = [
    {id:0,name:'3 idiots',genres:'life'},
    {id:1,name:'Ashi hi ashiqui',genres:'love'},
    {id:2,name:'bahubali',genres:'action'},
]

//Get mapping to get all moveies
router.get('/',(req,res)=>{
    res.send(movies);
});

//Get mapping to get specific movies
router.get('/:id',(req,res)=>{
    const movie = getSpecificMovies(req.params.id);
    if(!movie){
        res.status(404).send('movie not found');
    }else{
        res.send(movie)
    }
});

//Post mapping 
router.post('/',(req,res)=>{
    const input = inputValidation(req);
    if(input){
        const movie = {
            id: movies.length +1,
            name:req.body.name,
            genres:req.body.genres
        } 
        movies.push(movie);
        res.send(movie);
    }else{
        res.send('Please send a valid movie')
    }
});

//Put mapping
router.put('/:id',(req,res)=>{
    let movie = getSpecificMovies(req.params.id);
    if(!movie){
        res.status(404).send('Movies not found')
    }else{
        movie.name = req.body.name;
        movie.genres = req.body.genres;
        res.send(movie);
    }
})

//Delete mapping
router.delete('/:id',(req,res)=>{
   const movie = getSpecificMovies(req.params.id);
   if(movie){
       const index = movies.indexOf(movie);
       movies.splice(index,1);
       res.send(movie);
   }else{
       sendStatus(404,res);
   }
});

//Find movies with id
const getSpecificMovies = (id)=>{
     return movies.find(m=> m.id === parseInt(id)); 
};

const sendStatus =(status,res)=>{
    res.status(status).send(`${status} movie is not found`)
}

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