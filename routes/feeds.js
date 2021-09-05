const express = require('express');
const {FeedModel} = require('../models/models.js');

const router = express.Router();

//this prevents the CORS error from happening
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
}

// gets all feeds in our database
router.get('/', async(req, res)=>{
    req.header(headers);
    try {
        const theFeeds = await FeedModel.find();
        res.send(theFeeds);
    } catch (err) {
        res.send({error:err});
    }
});

// create a specific feed, requieres admin priviliges
router.post('/', async (req,res)=>{
    res.header(headers);
    const feed = new FeedModel({
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        author: req.body.author
    });
    try {
        const savedFeed = await feed.save();
        res.send(savedFeed);
    } catch (error){
        res.send(error);
    }
});

// patch request goes here

// delete request goes here //requieres admin privileges

module.exports = router;