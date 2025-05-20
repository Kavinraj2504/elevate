//lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    status: { type: String, enum: ['converted', 'pending', 'lost'], default: 'pending' },
    score: { type: Number, min: 0, max: 100 },
    cost: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
