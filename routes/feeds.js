const express = require('express');
const {FeedModel} = require('../models/models.js');

const router = express.Router();

// gets all feeds in our database
router.get('/', async(req, res)=>{
    try {
        const theFeeds = await FeedModel.find();
        res.send(theFeeds);
    } catch (err) {
        res.send({error:err});
    }
});

// create a specific feed, requieres admin priviliges
router.post('/', async (req,res)=>{
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