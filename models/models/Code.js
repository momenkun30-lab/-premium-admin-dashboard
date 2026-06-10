const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, trim: true },
    userId: { type: String, required: true },
    durationType: { type: String, enum: ['Day', 'Week', 'Month', 'Year'], required: true },
    isUsed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Code', CodeSchema);
