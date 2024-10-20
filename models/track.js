const mongoose = require('./connection');

const Track = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    artist: {
        type: String, 
        required: true
    }
});

const Song = mongoose.model('Track', Track);

module.exports = Song;