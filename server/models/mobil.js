const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mobil', {
    mobil_code: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "((ORD",
      primaryKey: true
    },
    mobil_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mobil',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mobil_pkey",
        unique: true,
        fields: [
          { name: "mobil_code" },
        ]
      },
    ]
  });
};
