const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dependents', {
    dependent_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    relationship: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'dependents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dependent_id_pk",
        unique: true,
        fields: [
          { name: "dependent_id" },
        ]
      },
      {
        name: "dependents_pkey",
        unique: true,
        fields: [
          { name: "dependent_id" },
        ]
      },
    ]
  });
};
