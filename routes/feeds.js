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
router.patch('/:t', auth, async (req, res) => {
    res.header(headers);
    try{
        const updatedFeed = await FeedModel.updateOne(
            {title: req.params.t},
            {$set: {comments: req.body.comments}
        });

        const token = user.generateAuthToken();

        res.json(updatedFeed).send(204).header(token);
        console.log(updatedFeed);
    }catch(err){
        console.log(`the error in patch: ${err}`);
    }
});

// delete request goes here //requieres admin privileges
router.delete('/:feedId', auth, async (req, res) => {
    try {
        const removedFeed = await FeedModel.remove({
            _id: req.params.feedId
        }, {
            $set: {comments : req.body.comments}
        });
        res.json(removedFeed);
    } catch (error) {
        res.json(error.message);
    }

});

module.exports = router;