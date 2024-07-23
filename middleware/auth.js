// Mengimpor package jsonwebtoken
const jwt = require('jsonwebtoken');

// Fungsi middleware untuk mengautentikasi pengguna
const authenticate = (req, res, next) => {
    // Mendapatkan token dari header Authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Memeriksa jika token tidak disediakan
    if (!token) {
        // Merespons dengan kode status 401 dan pesan jika token tidak disediakan
        return res.status(401).json({ message: 'Tidak ada token, otorisasi ditolak' });
    }

    try {
        // Memverifikasi token menggunakan kunci rahasia 'your_jwt_secret'
        const decoded = jwt.verify(token, 'your_jwt_secret');
        
        // Menambahkan informasi pengguna yang telah didekodekan ke objek request
        req.user = decoded;
        
        // Melanjutkan ke middleware atau handler route berikutnya
        next();
    } catch (err) {
        // Merespons dengan kode status 401 dan pesan jika token tidak valid
        res.status(401).json({ message: 'Token tidak valid' });
    }
};

// Fungsi middleware untuk mengotorisasi pengguna berdasarkan peran (roles)
const authorize = (roles = []) => {
    // Mengembalikan fungsi middleware
    return (req, res, next) => {
        // Memeriksa jika peran pengguna tidak termasuk dalam peran yang diizinkan
        if (!roles.includes(req.user.role)) {
            // Merespons dengan kode status 403 dan pesan jika pengguna tidak diizinkan
            return res.status(403).json({ message: 'Terlarang' });
        }
        
        // Melanjutkan ke middleware atau handler route berikutnya
        next();
    };
};

// Mengekspor fungsi middleware authenticate dan authorize
module.exports = { authenticate, authorize };
