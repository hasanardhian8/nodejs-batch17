const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    car_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "(((CAR",
      primaryKey: true
    },
    car_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'car',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "car_pkey",
        unique: true,
        fields: [
          { name: "car_name" },
        ]
      },
    ]
  });
};
