const express = require('express');
const auth = require('../middleware/auth.js');
const {
    FeedModel
} = require('../models/models.js');

const router = express.Router();

// //this prevents the CORS error from happening
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// gets all feeds in our database
router.get('/', async (req, res) => {
    res.header(headers);
    try {
        const theFeeds = await FeedModel.find();
        res.send(theFeeds);
    } catch (err) {
        res.send({
            error: err
        });
    }
});

// gets a single or multiple feeds that match the keyword
router.get('/:title', async (req, res) => {
    res.header(headers);
    try {
        const result = await FeedModel.find({
            title: {
                $regex: req.params.title,
                $options: "i"
            }
        });
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

// create a specific feed, requieres admin priviliges
router.post('/', auth, async (req, res) => {
    res.header(headers);
    const feed = new FeedModel({
        title: req.body.title,
        detailed: req.body.detailed,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        author: req.body.author
    });
    try {
        const savedFeed = await feed.save();
        res.send(savedFeed);
    } catch (error) {
        res.send(error);
    }
});

// patch request goes here
router.patch('/:id', auth, async (req, res) => {
    res.header(headers);
    const filter = {
        _id: req.params.id
    };
    console.log(req.params.id);
    const e = await FeedModel.findById(req.params.id);
    const updater = {
        author: (req.body.author) ? req.body.author : e.author,
        title: (req.body.title) ? req.body.title : e.title,
        content: (req.body.content) ? req.body.content : e.content,
        detailed: (req.body.detailed) ? req.body.detailed : e.detailed,
        imgUrl: (req.body.imgUrl) ? req.body.imgUrl : e.imgUrl,
    };
    console.log(req.body.author);
    let fd = await FeedModel.findOneAndUpdate(filter, updater);

    fd = await FeedModel.findOne(filter);

    res.send(fd);
});

// delete request goes here //requieres admin privileges
router.delete('/:id', auth, async (req, res) => {
    res.header(headers);

    const fd = await FeedModel.findById(req.params.id);
    if (!fd) res.send("ID doesnt exist!");

    const removedFeed = await FeedModel.deleteOne({
        _id: req.params.id
    });
    res.json(removedFeed);
});

module.exports = router;