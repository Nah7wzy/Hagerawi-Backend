const mongoose = require('mongoose');
const express = require('express');

import { v4 as uuidv4 } from 'uuid';
const {Feed} = require('../models/feed');
const router = express.Router();

router.get('/feed', async (req, res) => {
    const feeds = await Feed.find();
    console.log(feeds);
    res.send(feeds);
});