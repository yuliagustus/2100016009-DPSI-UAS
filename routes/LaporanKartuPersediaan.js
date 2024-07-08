// routes/LaporanKartuPersediaan.js

const express = require('express');
const router = express.Router();
const { LaporanKartuPersediaan } = require('../models/index');

// GET all laporan kartu persediaan
router.get('/', async (req, res, next) => {
  try {
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findAll();
    res.json(laporanKartuPersediaan);
  } catch (error) {
    next(error);
  }
});

// GET laporan kartu persediaan by Id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findByPk(id);
    if (!laporanKartuPersediaan) {
      return res.status(404).json({ message: 'Laporan Kartu Persediaan not found' });
    }
    res.json(laporanKartuPersediaan);
  } catch (error) {
    next(error);
  }
});

// POST new laporan kartu persediaan
router.post('/', async (req, res, next) => {
  const { Periode_Laporan, Stok_awal, Stok_masuk, Stok_akhir } = req.body;
  try {
    const newLaporan = await LaporanKartuPersediaan.create({
      Periode_Laporan,
      Stok_awal,
      Stok_masuk,
      Stok_akhir
    });
    res.status(201).json(newLaporan);
  } catch (error) {
    next(error);
  }
});

// PUT update laporan kartu persediaan
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { Periode_Laporan, Stok_awal, Stok_masuk, Stok_akhir } = req.body;
  try {
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findByPk(id);
    if (!laporanKartuPersediaan) {
      return res.status(404).json({ message: 'Laporan Kartu Persediaan not found' });
    }
    await laporanKartuPersediaan.update({
      Periode_Laporan,
      Stok_awal,
      Stok_masuk,
      Stok_akhir
    });
    res.json(laporanKartuPersediaan);
  } catch (error) {
    next(error);
  }
});

// DELETE laporan kartu persediaan
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const laporanKartuPersediaan = await LaporanKartuPersediaan.findByPk(id);
    if (!laporanKartuPersediaan) {
      return res.status(404).json({ message: 'Laporan Kartu Persediaan not found' });
    }
    await laporanKartuPersediaan.destroy();
    res.json({ message: 'Laporan Kartu Persediaan deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
