const bcrypt = require('bcryptjs');
const express = require('express');
const {
    UserModel,
} = require('../models/models.js');

const router = express.Router();

const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

router.post('/', async (req, res) => {
    res.header(headers);
    let user = await UserModel.findOne({
        username: req.body.username
    });
    if (!user) return res.status(400).send("Invalid email or password!");

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send("Invalid email or password!");

    const token = user.generateAuthToken();

    // code to return token as header if user is admin...
    (user.isAdmin) ? res.header('x-auth-token', token).send(token): res.send({username: user.username, password: token});

});

module.exports = router;