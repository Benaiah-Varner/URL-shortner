const express = require('express')
const server = express();
server.use(express.json());
const Url = require('./models/uriModel');
const validUrl = require('valid-url');
const shortId = require('shortid');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mongoCon = process.env.mongoCon;
const siteUrl = 'http://localhost:3001'
mongoose.connect(mongoCon, { useNewUrlParser: true, useUnifiedTopology: true });
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

server.use(cors(corsOptions));
const port = process.env.PORT || 3000
server.listen(port, () => console.log(`listening on port ${port}...`))

server.get('/', function (req, res) {
    res.status(200).send({
        message: 'Express backend server running!'
    });
});

server.post('/get-short-url', async (req, res) => {
    const { urlId } = req.body
    try {
        const url = await Url.findOne({
            urlId
        })
        res.status(200).json(url)
    } catch (err) {
        console.log(err)
        res.status(401).json(err)
    }
})

server.post('/create-short-url', async (req, res) => {
    const { originalUrl } = req.body

    try {
        if (!validUrl.isUri(originalUrl)) {
            res.status(401).json("Invalid URL")
        } else if (validUrl.isUri(originalUrl)) {
            const urlId = shortId.generate();
            const shortUrl = siteUrl + '/' + urlId

            const url = new Url({
                urlId,
                originalUrl,
                shortUrl,
                date: new Date()
            })

            await url.save()
            res.status(200).json(url)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
