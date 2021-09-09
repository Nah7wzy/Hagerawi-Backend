const express = require('express');
const {
    UserModel
} = require('../models/models');

const router = express.Router();

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}
// gets all users
router.get(
    '/', async () => {
        res.header(headers);
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (error) {
            res.send(error.message);
        }
    }
);

// get specific user 
router.get('/:username', async (req, res) => {
    res.header(headers);
    try {
        const result = await UserModel.find({
            username: req.params.username
        });
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

// when user signs up 
router.post('/', async (req, res) => {
    res.header(headers);
    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        archivedFeeds: req.body.archivedFeeds,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.send(error.message);
    }
});

// when admin deletes a user account 
router.delete('/:userusername', async (req, res) => {
    try {
        const deletedUser = await UserModel.remove({
            username: req.params.username
        });
        res.json(deletedUser);
    } catch (error) {
        res.send(error.message);
    }

});

module.exports = router;