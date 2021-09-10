const bcrypt = require('bcryptjs');
const express = require('express');
const {
    UserModel
} = require('../models/models');
const auth = require('../middleware/auth');

const router = express.Router();

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}
// gets all users, requires admin privelege
router.get('/', auth, async (req, res) => {
    res.header(headers);
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.send(error.message);
    }
});

// get specific user, requires admin privelege
router.get('/:username', auth, async (req, res) => {
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

// code for user to update his/her account details
router.patch('/me', async (req, res) => {
    const usr = await UserModel.findById(req);
    console.log(usr);
    try {
        usr.set({
            username: req.body.username,
            password: req.body.password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// when user signs up 
router.post('/', async (req, res) => {
    res.header(headers);

    let user = await UserModel.findOne({
        username: req.body.username
    });
    if (user) return res.status(400).send({"username": "User already exists!"});
    // console.log(req.body);
    
    try {
        const theUser = new UserModel({
            username: req.body.username,
            password: req.body.password,
            archivedFeeds: req.body.archivedFeeds,
        });
        console.log(theUser);
        const salt = await bcrypt.genSalt(10);
        theUser.password = await (await bcrypt.hash(theUser.password, salt));
        const theActualUser = await theUser.save();
        console.log(`the actual user is ${theActualUser}`);

        // this is the token that is to be saved on the client side,
        // it will be available on the headers
        const token = theUser.generateAuthToken();
        // res.header('x-auth-token', token).send(user);
        // res.send(token).send(user);
        res.send(theUser);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

// when admin deletes a user account 
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedUser = await UserModel.deleteOne({
            _id: req.params.id
        });
        res.json(deletedUser);
    } catch (error) {
        res.send(error.message);
    }

});

module.exports = router;