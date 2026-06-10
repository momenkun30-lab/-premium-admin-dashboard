const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ success: false, message: 'المسؤول غير موجود' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'كلمة المرور خاطئة' });

        req.session.adminId = admin._id;
        res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'تم تسجيل الخروج' });
};
