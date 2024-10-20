const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');

const Song = require('./models/track');

app.use(cors());
app.use(methodOverride('_method'));
app.use(express.json());

// Routes go here
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/tracks', async (req, res) => {
    try{
        const songs = await Song.find({});
        res.json(songs)
    }catch (err){
        res.status(400).json(err)
    }
});

app.get('/tracks/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.json(song);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.post('/tracks', async (req, res) => {
    try{
        res.json(await Song.create(req.body));
    }catch (err){
        res.status(400).json(err)
    }
});

app.delete('/tracks/:id', async (req, res) => {
    try {
       res.json(await Song.findByIdAndDelete(req.params.id))
    } catch (err) {
        res.status(400).json(err);
    }
});

app.put('/tracks/:id', async (req, res) => {
    try {
        res.json(await Song.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (err) {
        res.status(400).json(err);
    }
})

app.listen(3000, () => {
  console.log('The express app is ready!');
});

// https://generalassembly.instructure.com/courses/297/pages/express-rest-api-pets