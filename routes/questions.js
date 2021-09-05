const express = require('express');
const {QuestionModel} = require('../models/models.js');

const router = express.Router();

//this prevents the CORS error from happening
const headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Headers": "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
}

router.get('/questions', async(req,res) => {
    res.header(headers)
    try{
        const theQues = await QuestionModel.find();
        res.send(theQues);
    } catch (err){
        res.send({error:err});
    }
});

module.exports = router