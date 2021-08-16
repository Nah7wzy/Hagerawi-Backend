const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    title: String,
    author: String,
    tags: [ String ],
    article: String,
    date: { type: Date, default: Date.now},
    
});


const Feed = mongoose.model('Feed', feedSchema);

async function createFeed() {
    const feed = new Feed({
        title: 'title 1',
        author: 'Jayz',
        tags: ['angular', 'front end'],
        article: 'this will be the long ass article that will be displayed'
    });
}

createFeed();