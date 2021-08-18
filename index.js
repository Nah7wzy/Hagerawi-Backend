const mongoose = require('mongoose');
const express = require('express');

const app = express();


mongoose.connect('mongodb://localhost:27017/Hagerawi', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('succesful connection'))
.catch(err => console.error('error', err))


const feedRoute = require('./routes/feed.js')
app.use('/feeds', feedRoute);


app.get('/', async (req, res) => {
    console.log("Home");
    res.send("Home");
});



app.listen(3006)
// createFeed();