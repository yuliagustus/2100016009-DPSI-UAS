// Mengimpor Express dan membuat router
const express = require('express');
const router = express.Router();

// Mengimpor model Barang dari direktori models
const { Barang } = require('../models/index');

// Mengimpor middleware authenticate
const { authenticate } = require('../middleware/auth');

// GET semua barang
router.get('/', async (req, res, next) => {
  try {
    // Mendapatkan semua data barang dari database
    const barang = await Barang.findAll();
    // Mengirimkan data barang dalam format JSON sebagai respon
    res.json(barang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// GET barang berdasarkan Id dengan autentikasi
router.get('/:id', authenticate, async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  try {
    // Mencari barang berdasarkan primary key (id)
    const barang = await Barang.findByPk(id);
    if (!barang) {
      // Jika barang tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    // Mengirimkan data barang dalam format JSON sebagai respon
    res.json(barang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// POST barang baru
router.post('/', async (req, res, next) => {
  const { Nama_Barang, Harga_Barang, Stok_Barang } = req.body; // Mendapatkan data barang dari body request
  try {
    // Membuat data barang baru di database
    const newBarang = await Barang.create({
      Nama_Barang,
      Harga_Barang,
      Stok_Barang
    });
    // Mengirimkan data barang baru dalam format JSON dengan status 201 (Created)
    res.status(201).json(newBarang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// PUT untuk memperbarui barang berdasarkan id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  const { Nama_Barang, Harga_Barang, Stok_Barang } = req.body; // Mendapatkan data barang dari body request
  try {
    // Mencari barang berdasarkan primary key (id)
    const barang = await Barang.findByPk(id);
    if (!barang) {
      // Jika barang tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    // Memperbarui data barang di database
    await barang.update({
      Nama_Barang,
      Harga_Barang,
      Stok_Barang
    });
    // Mengirimkan data barang yang telah diperbarui dalam format JSON sebagai respon
    res.json(barang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// DELETE barang berdasarkan id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  try {
    // Mencari barang berdasarkan primary key (id)
    const barang = await Barang.findByPk(id);
    if (!barang) {
      // Jika barang tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    // Menghapus data barang dari database
    await barang.destroy();
    // Mengirimkan pesan sukses dalam format JSON sebagai respon
    res.json({ message: 'Barang berhasil dihapus' });
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// Mengekspor router untuk digunakan di aplikasi utama
module.exports = router;
