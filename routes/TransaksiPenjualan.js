// Mengimpor Express dan membuat router
const express = require('express');
const router = express.Router();

// Mengimpor model TransaksiPenjualan dari direktori models
const { TransaksiPenjualan } = require('../models');

// Mengimpor middleware authenticate
const { authenticate } = require('../middleware/auth');

// GET semua transaksi penjualan dengan autentikasi
router.get('/', authenticate, async (req, res, next) => {
  try {
    // Mendapatkan semua data transaksi penjualan dari database
    const transaksi = await TransaksiPenjualan.findAll();
    // Mengirimkan data transaksi penjualan dalam format JSON sebagai respon
    res.json(transaksi);
  } catch (err) {
    // Meneruskan error ke middleware error handler
    next(err);
  }
});

// POST membuat transaksi penjualan baru
router.post('/', async (req, res, next) => {
  try {
    // Membuat data transaksi penjualan baru di database dengan data dari body request
    const newTransaksi = await TransaksiPenjualan.create(req.body);
    // Mengirimkan data transaksi penjualan baru dalam format JSON dengan status 201 (Created)
    res.status(201).json(newTransaksi);
  } catch (err) {
    // Meneruskan error ke middleware error handler
    next(err);
  }
});

// Mengekspor router untuk digunakan di aplikasi utama
module.exports = router;
