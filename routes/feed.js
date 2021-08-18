const mongoose = require('mongoose');
const express = require('express');

const app = express();

// import { v4 as uuidv4 } from 'uuid';
const Feed = require('../models/feed');
const router = express.Router();



router.get('/', async (req, res) => {
    const feeds = await Feed.find();
    console.log(feeds);
    res.send(feeds);
});



module.exports = router;