// models/LaporanKartuPersediaan.js

module.exports = (sequelize, DataTypes) => {
    const LaporanKartuPersediaan = sequelize.define('LaporanKartuPersediaan', {
      Id_Laporan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Periode_Laporan: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Stok_awal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Stok_masuk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Stok_akhir: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'LaporanKartuPersediaan', // Nama tabel sesuai dengan yang ada di database
      timestamps: false, // Jika tidak ada kolom createdAt dan updatedAt
    });
  
    LaporanKartuPersediaan.associate = function(models) {
      LaporanKartuPersediaan.belongsTo(models.Barang, {
        foreignKey: 'Id_barang',
        as: 'barang'
      });
    };
  
    return LaporanKartuPersediaan;
  };
  