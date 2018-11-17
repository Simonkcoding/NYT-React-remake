//import 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articles = require('./routes/api/articles')

//middleware
app.use(bodyParser.json());
app.use('/api/articles',articles);
if (process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))
}

//Connect mongo DB
const db = require('./config/key').mongoURI;

mongoose
.connect(db)
.then(()=>console.log('Connected Mongo'))
.catch(err=>console.log(err))

//Connect backend
const port = process.env.PORT||5000;
app.listen(port,() =>console.log(`Server started at ${port}`));
