const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('succesful connection'))
.catch(err => console.error('error', err))
