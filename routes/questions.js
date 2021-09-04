const express = require('express');
const {QuestionModel} = require('../models/models.js');

const router = express.Router();

router.get('/questions', async(req,res) => {
    try{
        const theQues = await QuestionModel.find();
        res.send(theQues);
    } catch (err){
        res.send({error:err});
    }
});