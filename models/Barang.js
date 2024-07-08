module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    Id_Barang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nama_Barang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Harga_Barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Stok_Barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Barang', // Nama tabel sesuai dengan yang ada di database
    timestamps: false, // Jika tidak ada kolom createdAt dan updatedAt
  });

  return Barang;
};
