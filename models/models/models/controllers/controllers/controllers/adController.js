const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
    const { title, mediaUrl, mediaType, priority, duration } = req.body;
    try {
        const newAd = new Ad({ title, mediaUrl, mediaType, priority, duration });
        await newAd.save();
        res.json({ success: true, data: newAd });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAds = async (req, res) => {
    try {
        const ads = await Ad.find().sort({ priority: -1, createdAt: -1 });
        res.json({ success: true, data: ads });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
