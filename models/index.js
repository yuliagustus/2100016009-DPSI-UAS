const { Sequelize, DataTypes } = require('sequelize');

require("dotenv").config(); // Load environment variables

const serviceUri = process.env.DB_URI;

const sequelize = new Sequelize(serviceUri, {
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
});


// const sequelize = new Sequelize('dpsiuas', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// Import model-model yang dibutuhkan
const BarangModel = require('./Barang');
const LaporanKartuPersediaanModel = require('./LaporanKartuPersediaan');
const PetugasGudangModel = require('./PetugasGudang');
const TransaksiPenjualanModel = require('./TransaksiPenjualan');
const UserModel = require('./user'); // Pastikan impor UserModel dari file yang benar

// Inisialisasi model-model dengan Sequelize instance
const Barang = BarangModel(sequelize, DataTypes);
const LaporanKartuPersediaan = LaporanKartuPersediaanModel(sequelize, DataTypes);
const PetugasGudang = PetugasGudangModel(sequelize, DataTypes);
const TransaksiPenjualan = TransaksiPenjualanModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes); // Inisialisasi model User dengan Sequelize instance

// Fungsi untuk sinkronisasi model dengan database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err.message);
    process.exit(1); // Keluar dari proses jika terjadi kesalahan sinkronisasi
  });

// Ekspor instance Sequelize dan model-model yang sudah disinkronkan
module.exports = {
  sequelize,
  Barang,
  LaporanKartuPersediaan,
  PetugasGudang,
  TransaksiPenjualan,
  User // Pastikan User dimasukkan dalam ekspor
};
