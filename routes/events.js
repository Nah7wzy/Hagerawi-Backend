const express = require('express');
const {EventModel} = require('../models/models.js');
// import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

//this prevents the CORS error from happening
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
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
router.get('/:title', async (req, res) => {
    res.header(headers);
    try {
        const result = await EventModel.find({
            title: req.params.title
        });
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
        detailedDescription: req.body.detailedDescription,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
    });
    try {
        const savedEvent = await event.save();
        res.send(savedEvent);
    } catch (error) {
        res.send(error.message);
    }
});


// patch request goes here

// delete request goes here //requieres admin privileges
router.delete('/:id', async (req, res) => {
    const event_num = event.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    const index = event.indexOf(event_num);
    event.splice(index, 1);

    res.send(course);

});

module.exports = router;