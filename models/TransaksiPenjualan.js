// models/TransaksiPenjualan.js
module.exports = (sequelize, DataTypes) => {
    const TransaksiPenjualan = sequelize.define('TransaksiPenjualan', {
      Id_Transaksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Id_Pelanggan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      Id_Petugas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'TransaksiPenjualan',
      timestamps: false,
    });
  
    // Definisikan hubungan dengan model lain jika diperlukan
    TransaksiPenjualan.belongsTo(sequelize.models.PetugasGudang, {
      foreignKey: 'Id_Petugas',
      as: 'petugasGudang'
    });
  
    return TransaksiPenjualan;
  };
  