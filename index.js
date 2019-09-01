//Importing express module
const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const helmet = require('helmet');
// const movies = require('./routes/movies');
const cors = require('cors');
// const home = require('./routes/home');
const vidly = require('./routes/vidly');
const users = require('./routes/users');
const app = express();
app.use(cors());

//Configuration 
console.log(config.get('name'));
console.log(config.get('mail.host'));
// console.log(config.get('mail.password'));

app.set('view engine','pug');
app.set('views','./views')

//JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
// app.use('/api/movies',movies);
// app.use('/',home);
app.use('/api/vidly',vidly);
app.use('/api/user',users);
if(app.get('env')==='development'){
    debug('Morgan enabled...')
    app.use(morgan('tiny'));
}
// app.use(logger);
// app.use(auth);

//Port Configutarion
const port = 3000;
app.listen(port,()=>{
    console.log(`Listning on port ${port}`)
});







