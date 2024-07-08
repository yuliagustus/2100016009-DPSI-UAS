const express = require('express');
const router = express.Router();
const { Barang } = require('../models/index');

// GET all barang
router.get('/', async (req, res, next) => {
  try {
    const barang = await Barang.findAll();
    res.json(barang);
  } catch (error) {
    next(error); // Meneruskan error ke middleware error handler
  }
});

// GET barang by Id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const barang = await Barang.findByPk(id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang not found' });
    }
    res.json(barang);
  } catch (error) {
    next(error); // Meneruskan error ke middleware error handler
  }
});

// POST new barang
router.post('/', async (req, res, next) => {
  const { Nama_Barang, Harga_Barang, Stok_Barang } = req.body;
  try {
    const newBarang = await Barang.create({
      Nama_Barang,
      Harga_Barang,
      Stok_Barang
    });
    res.status(201).json(newBarang); // Menyertakan status 201 untuk indikasi Created
  } catch (error) {
    next(error); // Meneruskan error ke middleware error handler
  }
});

// PUT update barang
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { Nama_Barang, Harga_Barang, Stok_Barang } = req.body;
  try {
    const barang = await Barang.findByPk(id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang not found' });
    }
    await barang.update({
      Nama_Barang,
      Harga_Barang,
      Stok_Barang
    });
    res.json(barang);
  } catch (error) {
    next(error); // Meneruskan error ke middleware error handler
  }
});

// DELETE barang
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const barang = await Barang.findByPk(id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang not found' });
    }
    await barang.destroy();
    res.json({ message: 'Barang deleted successfully' });
  } catch (error) {
    next(error); // Meneruskan error ke middleware error handler
  }
});

module.exports = router;
