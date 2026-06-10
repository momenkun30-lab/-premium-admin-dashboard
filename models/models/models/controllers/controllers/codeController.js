const Code = require('../models/Code');

// دالة محترفة لتوليد كود عشوائي فريد (4 حروف كابيتال + 3 أرقام)
const generateCustomCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let charPart = '';
    let numPart = '';
    for (let i = 0; i < 4; i++) charPart += letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 0; i < 3; i++) numPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
    return charPart + numPart;
};

exports.createCode = async (req, res) => {
    const { userId, durationType } = req.body;
    try {
        let uniqueCode = generateCustomCode();
        let codeExists = await Code.findOne({ code: uniqueCode });
        
        while (codeExists) {
            uniqueCode = generateCustomCode();
            codeExists = await Code.findOne({ code: uniqueCode });
        }

        const newCode = new Code({ code: uniqueCode, userId, durationType });
        await newCode.save();
        res.json({ success: true, data: newCode });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getCodes = async (req, res) => {
    try {
        const codes = await Code.find().sort({ createdAt: -1 });
        res.json({ success: true, data: codes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
