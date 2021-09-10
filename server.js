const config = require('config');
const express = require('express');
const eventsRoute = require('./routes/events.js');
const feedsRoute = require('./routes/feeds.js');
const questionsRoute = require('./routes/questions.js');
const auth = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const mongoose =  require('mongoose');
require('dotenv/config'); //go to the .env file and change the database address for mongoose to work

if (!config.get("jwtPrivateKey")){
    console.error('FATAL ERROR!\nJWT private key not found!!!');
    process.exit(1);
}

//connect to the database
mongoose.connect(
    process.env.DB_CONNECTION, // this part is machine dependent as the local host varies from device to device
    { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false},
    ()=>{console.log("connected to db");}
);
//start our exress server
const app = express();
//tell our server we are going to handle json format requests and resposes
app.use(express.json());
//this package must be used to solve the CORS problem
const cors = require("cors");
app.use(cors());
//these are called middlewares that handle our requests (the logic is actually somwhere else) 
app.use('/feeds', feedsRoute);
app.use('/events', eventsRoute);
app.use('/questions', questionsRoute);
app.use('/users', usersRoute);
app.use('/auth', auth);

app.listen(5000, ()=>{
    console.log(`Server Running on Port: http://localhost:5000`);
});