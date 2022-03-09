const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_assignments', {
    pras_proj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'proj_id'
      }
    },
    pras_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    pras_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_assignments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pras_proj_employee_pk",
        unique: true,
        fields: [
          { name: "pras_proj_id" },
          { name: "pras_employee_id" },
        ]
      },
      {
        name: "project_assignments_pkey",
        unique: true,
        fields: [
          { name: "pras_proj_id" },
          { name: "pras_employee_id" },
        ]
      },
    ]
  });
};
