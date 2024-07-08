const express = require('express');
const router = express.Router();
const { User } = require('../models/index'); // Pastikan impor benar-benar sesuai
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route untuk registrasi pengguna baru
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        console.log('Membuat pengguna baru:', username, role);
        const newUser = await User.create({ username, password, role });
        res.status(201).json({ message: 'Pengguna berhasil terdaftar' });
    } catch (err) {
        console.error('Error creating user:', err);
        next(err);
    }
});

// Route untuk proses login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Kredensial tidak valid' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Kredensial tidak valid' });
        }
        const token = jwt.sign({ id: user.id, role: user.role },
            'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
