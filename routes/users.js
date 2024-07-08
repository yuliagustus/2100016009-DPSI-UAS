const express = require('express');
const router = express.Router();
const { User } = require('../models/index'); // Pastikan impor model sudah benar
const upload = require('../middleware/upload'); // Middleware untuk mengunggah file
const { authenticate } = require('../middleware/auth'); // Middleware untuk otentikasi

// Endpoint untuk mengunggah gambar profil
router.post('/uploadProfilePic', authenticate, upload.single('profilePic'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File size is too large. Max file size is 10MB' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profilePic = req.file.path; // Menyimpan path gambar ke database
        await user.save();
        res.json({
            message: 'Profile picture uploaded successfully',
            filePath: req.file.path
        });
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk mendapatkan semua pengguna
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk membuat pengguna baru
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui pengguna berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus pengguna berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
