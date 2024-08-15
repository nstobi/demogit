// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Url = require('./models/Url');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

mongoose.connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/shorten', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const shortCode = shortid.generate();
        const url = new Url({ originalUrl, shortCode });
        await url.save();
        res.json({ shortUrl: `http://localhost:2000/${shortCode}` });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.code });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(2000, () => console.log('Server running on port 2000'));
