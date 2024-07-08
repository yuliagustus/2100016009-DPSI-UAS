const express = require('express');
const router = express.Router();
const { TransaksiPenjualan } = require('../models');

// GET all transaksi penjualan
router.get('/', async (req, res, next) => {
  try {
    const transaksi = await TransaksiPenjualan.findAll();
    res.json(transaksi);
  } catch (err) {
    next(err);
  }
});

// POST create a new transaksi penjualan
router.post('/', async (req, res, next) => {
  try {
    const newTransaksi = await TransaksiPenjualan.create(req.body);
    res.status(201).json(newTransaksi);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
