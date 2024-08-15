// models/Url.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Url', urlSchema);
