// Mengimpor Express dan membuat router
const express = require('express');
const router = express.Router();

// Mengimpor model PetugasGudang dari direktori models
const { PetugasGudang } = require('../models/index');

// Mengimpor middleware authenticate
const { authenticate } = require('../middleware/auth');

// GET semua petugas gudang
router.get('/', async (req, res, next) => {
  try {
    // Mendapatkan semua data petugas gudang dari database
    const petugasGudang = await PetugasGudang.findAll();
    // Mengirimkan data petugas gudang dalam format JSON sebagai respon
    res.json(petugasGudang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// GET petugas gudang berdasarkan Id dengan autentikasi
router.get('/:id', authenticate, async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  try {
    // Mencari petugas gudang berdasarkan primary key (id)
    const petugasGudang = await PetugasGudang.findByPk(id);
    if (!petugasGudang) {
      // Jika petugas gudang tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Petugas Gudang tidak ditemukan' });
    }
    // Mengirimkan data petugas gudang dalam format JSON sebagai respon
    res.json(petugasGudang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// POST petugas gudang baru
router.post('/', async (req, res, next) => {
  const { Username, Password } = req.body; // Mendapatkan data petugas gudang dari body request
  try {
    // Membuat data petugas gudang baru di database
    const newPetugas = await PetugasGudang.create({
      Username,
      Password
    });
    // Mengirimkan data petugas gudang baru dalam format JSON dengan status 201 (Created)
    res.status(201).json(newPetugas);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// PUT untuk memperbarui petugas gudang berdasarkan id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  const { Username, Password } = req.body; // Mendapatkan data petugas gudang dari body request
  try {
    // Mencari petugas gudang berdasarkan primary key (id)
    const petugasGudang = await PetugasGudang.findByPk(id);
    if (!petugasGudang) {
      // Jika petugas gudang tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Petugas Gudang tidak ditemukan' });
    }
    // Memperbarui data petugas gudang di database
    await petugasGudang.update({
      Username,
      Password
    });
    // Mengirimkan data petugas gudang yang telah diperbarui dalam format JSON sebagai respon
    res.json(petugasGudang);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// DELETE petugas gudang berdasarkan id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  try {
    // Mencari petugas gudang berdasarkan primary key (id)
    const petugasGudang = await PetugasGudang.findByPk(id);
    if (!petugasGudang) {
      // Jika petugas gudang tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Petugas Gudang tidak ditemukan' });
    }
    // Menghapus data petugas gudang dari database
    await petugasGudang.destroy();
    // Mengirimkan pesan sukses dalam format JSON sebagai respon
    res.json({ message: 'Petugas Gudang berhasil dihapus' });
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// Mengekspor router untuk digunakan di aplikasi utama
module.exports = router;
