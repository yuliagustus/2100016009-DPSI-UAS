// Mengimpor Express dan membuat router
const express = require('express');
const router = express.Router();

// Mengimpor model LaporanKartuPersediaan dari direktori models
const { LaporanKartuPersediaan } = require('../models/index');

// Mengimpor middleware authenticate
const { authenticate } = require('../middleware/auth');

// GET semua laporan kartu persediaan
router.get('/', async (req, res, next) => {
  try {
    // Mendapatkan semua data laporan kartu persediaan dari database
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findAll();
    // Mengirimkan data laporan kartu persediaan dalam format JSON sebagai respon
    res.json(laporanKartuPersediaan);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// GET laporan kartu persediaan berdasarkan Id dengan autentikasi
router.get('/:id', authenticate, async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  try {
    // Mencari laporan kartu persediaan berdasarkan primary key (id)
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findByPk(id);
    if (!laporanKartuPersediaan) {
      // Jika laporan kartu persediaan tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Laporan Kartu Persediaan tidak ditemukan' });
    }
    // Mengirimkan data laporan kartu persediaan dalam format JSON sebagai respon
    res.json(laporanKartuPersediaan);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// POST laporan kartu persediaan baru
router.post('/', async (req, res, next) => {
  const { Periode_Laporan, Stok_awal, Stok_masuk, Stok_akhir } = req.body; // Mendapatkan data laporan kartu persediaan dari body request
  try {
    // Membuat data laporan kartu persediaan baru di database
    const newLaporan = await LaporanKartuPersediaan.create({
      Periode_Laporan,
      Stok_awal,
      Stok_masuk,
      Stok_akhir
    });
    // Mengirimkan data laporan kartu persediaan baru dalam format JSON dengan status 201 (Created)
    res.status(201).json(newLaporan);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// PUT untuk memperbarui laporan kartu persediaan berdasarkan id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  const { Periode_Laporan, Stok_awal, Stok_masuk, Stok_akhir } = req.body; // Mendapatkan data laporan kartu persediaan dari body request
  try {
    // Mencari laporan kartu persediaan berdasarkan primary key (id)
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findByPk(id);
    if (!laporanKartuPersediaan) {
      // Jika laporan kartu persediaan tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Laporan Kartu Persediaan tidak ditemukan' });
    }
    // Memperbarui data laporan kartu persediaan di database
    await laporanKartuPersediaan.update({
      Periode_Laporan,
      Stok_awal,
      Stok_masuk,
      Stok_akhir
    });
    // Mengirimkan data laporan kartu persediaan yang telah diperbarui dalam format JSON sebagai respon
    res.json(laporanKartuPersediaan);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// DELETE laporan kartu persediaan berdasarkan id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params; // Mendapatkan id dari parameter URL
  try {
    // Mencari laporan kartu persediaan berdasarkan primary key (id)
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findByPk(id);
    if (!laporanKartuPersediaan) {
      // Jika laporan kartu persediaan tidak ditemukan, mengirimkan respon 404 (Not Found)
      return res.status(404).json({ message: 'Laporan Kartu Persediaan tidak ditemukan' });
    }
    // Menghapus data laporan kartu persediaan dari database
    await laporanKartuPersediaan.destroy();
    // Mengirimkan pesan sukses dalam format JSON sebagai respon
    res.json({ message: 'Laporan Kartu Persediaan berhasil dihapus' });
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// Mengekspor router untuk digunakan di aplikasi utama
module.exports = router;
