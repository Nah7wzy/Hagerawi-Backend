const express = require('express');
const eventsRoute = require('./routes/events.js');
const feedsRoute = require('./routes/feeds.js');
const mongoose =  require('mongoose');
require('dotenv/config'); //go to the .env file and change the database address for mongoose to work

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
//these are called middlewares that handle our requests (the logic is actually somwhere else) 
app.use('/feeds', feedsRoute);
app.use('/events', eventsRoute);

app.listen(5000, ()=>{
    console.log(`Server Running on Port: http://Localhost:5000`);
});