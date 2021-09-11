const express = require('express');
const auth = require('../middleware/auth.js');
const {
    EventModel
} = require('../models/models.js');
// import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

//this prevents the CORS error from happening
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

//gets all events
router.get('/', async (req, res) => {
    res.header(headers);
    try {
        const events = await EventModel.find();
        res.json(events);
    } catch (error) {
        res.send(error.message);
    }
});

// gets a specific event by title
router.get('/:id', async (req, res) => {
    res.header(headers);
    try {
        const result = await EventModel.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

//post an event; admin privileges required 
router.post('/', async (req, res) => {
    res.header(headers);
    const event = new EventModel({
        postedBy: req.body.postedBy,
        title: req.body.title,
        attendees: req.body.attendees,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        location: req.body.location,
    });
    try {
        const savedEvent = await event.save();
        res.send(savedEvent);
    } catch (error) {
        res.send(error.message);
    }
});

// patch request goes here
router.patch('/:id', auth, async (req, res) => {
    res.header(headers);
    const filter = {
        _id: req.params.id
    };
    console.log(req.params.id);

    let e = await EventModel.findById(req.params.id);

    const updater = {
        postedBy: (req.body.postedBy) ? req.body.postedBy : e.postedBy,
        title: (req.body.title) ? req.body.title : e.title,
        content: (req.body.content) ? req.body.content : e.content,
        attendees: (req.body.attendees) ? req.body.attendees : e.attendees,
        imgUrl: (req.body.imgUrl) ? req.body.imgUrl : e.imgUrl,
        location: (req.body.location) ? req.body.location : e.location,
    };
    console.log(req.body.postedBy);
    let ev = await EventModel.findOneAndUpdate(filter, updater);

    ev = await EventModel.findOne(filter);

    res.send(ev);
});

// delete request goes here //requieres admin privileges
router.delete('/:id', auth, async (req, res) => {
    try {
        const removedEvent = await EventModel.deleteOne({
            _id: req.params.id
        });
        res.json(removedEvent);
    } catch (error) {
        res.send(error);
    }

});

module.exports = router;