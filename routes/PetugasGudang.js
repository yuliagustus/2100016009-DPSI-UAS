// routes/petugasGudang.js
const express = require('express');
const router = express.Router();
const { PetugasGudang } = require('../models/index');

// GET all petugas gudang
router.get('/', async (req, res, next) => {
  try {
    const petugasGudang = await PetugasGudang.findAll();
    res.json(petugasGudang);
  } catch (error) {
    next(error);
  }
});

// GET petugas gudang by Id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const petugasGudang = await PetugasGudang.findByPk(id);
    if (!petugasGudang) {
      return res.status(404).json({ message: 'Petugas Gudang not found' });
    }
    res.json(petugasGudang);
  } catch (error) {
    next(error);
  }
});

// POST new petugas gudang
router.post('/', async (req, res, next) => {
  const { Username, Password } = req.body;
  try {
    const newPetugas = await PetugasGudang.create({
      Username,
      Password
    });
    res.status(201).json(newPetugas);
  } catch (error) {
    next(error);
  }
});

// PUT update petugas gudang
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { Username, Password } = req.body;
  try {
    const petugasGudang = await PetugasGudang.findByPk(id);
    if (!petugasGudang) {
      return res.status(404).json({ message: 'Petugas Gudang not found' });
    }
    await petugasGudang.update({
      Username,
      Password
    });
    res.json(petugasGudang);
  } catch (error) {
    next(error);
  }
});

// DELETE petugas gudang
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const petugasGudang = await PetugasGudang.findByPk(id);
    if (!petugasGudang) {
      return res.status(404).json({ message: 'Petugas Gudang not found' });
    }
    await petugasGudang.destroy();
    res.json({ message: 'Petugas Gudang deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
