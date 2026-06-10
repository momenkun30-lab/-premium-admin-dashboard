const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// تشغيل الاتصال المباشر بقاعدة البيانات
connectDB();

// إعداد معالجات البيانات
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// حماية الجلسات للأدمن (Session Authentication)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // يتم تفعيلها true عند النشر النهائي بـ HTTPS
        maxAge: 1000 * 60 * 60 * 12 // صلاحية تسجيل الدخول للأدمن هي 12 ساعة
    }
}));

// مجلد الواجهة العامة
app.use(express.static(path.join(__dirname, 'public')));

// مسار شاشة الدخول الرئيسية للوحة التحكم
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// تشغيل البورت الذكي
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Admin Panel Server is running perfectly on port ${PORT}`);
});
