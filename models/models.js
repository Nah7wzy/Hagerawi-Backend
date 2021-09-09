const mongoose = require('mongoose');

//what a single feed is going to look like
const feedSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    detailed: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [],
        required: false
    }
});

//what a single event is going to look like
const eventSchema = mongoose.Schema({
    postedBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ""
    },
    attendees: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// (single user schema) this isn't all obviously, well add more.
// needs to be done
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    archivedFeeds: {
        type: [],
    },
});

const questionSchema = mongoose.Schema({
    questions: {
        type: String,
        required: true
    },
    choices: {
        type: [],
        required: true,
    },
    answers: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
    }

});

const FeedModel = mongoose.model('feeds', feedSchema);
const EventModel = mongoose.model('events', eventSchema);
const UserModel = mongoose.model('users', userSchema);
const QuestionModel = mongoose.model('question', questionSchema);

module.exports = {
    FeedModel,
    EventModel,
    UserModel,
    QuestionModel
};