const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    priority: { type: Number, default: 0 },
    duration: { type: String, enum: ['1 Day', '1 Week', '1 Month', '2 Months', '1 Year'], required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Ad', AdSchema);
