const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    campaign: String,
    source: String,
    date: Date,
    score: Number,
    budget: Number,
    conversion: Boolean
});

module.exports = mongoose.model('Lead', leadSchema);
