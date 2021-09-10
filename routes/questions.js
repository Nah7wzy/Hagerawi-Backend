const express = require('express');
const admin = require('../middleware/admin.js');
const auth = require('../middleware/auth.js');
const {QuestionModel} = require('../models/models.js');

const router = express.Router();

//this prevents the CORS error from happening
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

router.get('/', async(req,res) => {
    res.header(headers)
    try{
        const theQues = await QuestionModel.find();
        res.send(theQues);
    } catch (err){
        res.send({error:err});
    }
});

router.post('/', auth, async (req, res) => {
    res.header(headers);
    const question = new QuestionModel({
        question: req.body.question,
        choices: req.body.choices,
        answers: req.body.answers,
        imgUrl: req.body.imgUrl,
    });
    try {
        await question.save();
        res.send(question);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router