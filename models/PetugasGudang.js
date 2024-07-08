// models/PetugasGudang.js

module.exports = (sequelize, DataTypes) => {
    const PetugasGudang = sequelize.define('PetugasGudang', {
        Id_Petugas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'PetugasGudang', // Sesuaikan dengan nama tabel di database
        timestamps: false, // Sesuaikan dengan kebutuhan Anda, jika tidak ada kolom createdAt dan updatedAt
    });

    return PetugasGudang;
};
