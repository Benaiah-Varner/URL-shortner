const mongoose = require('mongoose')

const URLschema = mongoose.Schema({
    urlId: String,
    originalUrl: String,
    shortUrl: String,
    date: {
        type: String,
        defualt: Date.now
    }
})

module.exports = mongoose.model('Url', URLschema)