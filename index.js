//Importing express module
const express = require('express');
const app = express();

//JSON
app.use(express.json());

//Port Configutarion
const port = 3000;
app.listen(port,()=>{
    console.log(`Listning on port ${port}`)
});

const movies = [
    {id:0,name:'3 idiots',genres:'life'},
    {id:1,name:'Ashi hi ashiqui',genres:'love'},
    {id:2,name:'bahubali',genres:'action'},
]

//Get mapping for app start 
app.get('/',(req,res)=>{
    res.send(`Application Running on Port Number ${port}`);
});

//Get mapping to get all moveies
app.get('/api/movies',(req,res)=>{
    res.send(movies);
});

//Get mapping to get specific movies
app.get('/api/movies/:id',(req,res)=>{
    const movie = getSpecificMovies(req.params.id);
    if(!movie){
        res.status(404).send('movie not found');
    }else{
        res.send(movie)
    }
});

//Post mapping 
app.post('/api/movies',(req,res)=>{
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
app.put('/api/movies/:id',(req,res)=>{
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
app.delete('/api/movies/:id',(req,res)=>{
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


