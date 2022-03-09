import Sequelize from "sequelize";
import config from "../../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : "postgres",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)

const DataTypes = require("sequelize").DataTypes;
const _car = require("./car");
const _countries = require("./countries");
const _departments = require("./departments");
const _dependents = require("./dependents");
const _employees = require("./employees");
const _employees_images = require("./employees_images");
const _jobs = require("./jobs");
const _locations = require("./locations");
const _mobil = require("./mobil");
const _project_assignments = require("./project_assignments");
const _projects = require("./projects");
const _regions = require("./regions");
const _users = require("./users");

function initModels(sequelize) {
  const car = _car(sequelize, DataTypes);
  const countries = _countries(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const dependents = _dependents(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const employees_images = _employees_images(sequelize, DataTypes);
  const jobs = _jobs(sequelize, DataTypes);
  const locations = _locations(sequelize, DataTypes);
  const mobil = _mobil(sequelize, DataTypes);
  const project_assignments = _project_assignments(sequelize, DataTypes);
  const projects = _projects(sequelize, DataTypes);
  const regions = _regions(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  employees.belongsToMany(projects, { as: 'pras_proj_id_projects', through: project_assignments, foreignKey: "pras_employee_id", otherKey: "pras_proj_id" });
  projects.belongsToMany(employees, { as: 'pras_employee_id_employees', through: project_assignments, foreignKey: "pras_proj_id", otherKey: "pras_employee_id" });
  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  dependents.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(dependents, { as: "dependents", foreignKey: "employee_id"});
  employees.belongsTo(employees, { as: "manager", foreignKey: "manager_id"});
  employees.hasMany(employees, { as: "employees", foreignKey: "manager_id"});
  employees_images.belongsTo(employees, { as: "emim_employee", foreignKey: "emim_employee_id"});
  employees.hasMany(employees_images, { as: "employees_images", foreignKey: "emim_employee_id"});
  project_assignments.belongsTo(employees, { as: "pras_employee", foreignKey: "pras_employee_id"});
  employees.hasMany(project_assignments, { as: "project_assignments", foreignKey: "pras_employee_id"});
  projects.belongsTo(employees, { as: "proj_account_mgr_employee", foreignKey: "proj_account_mgr"});
  employees.hasMany(projects, { as: "projects", foreignKey: "proj_account_mgr"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  project_assignments.belongsTo(projects, { as: "pras_proj", foreignKey: "pras_proj_id"});
  projects.hasMany(project_assignments, { as: "project_assignments", foreignKey: "pras_proj_id"});

  return {
    car,
    countries,
    departments,
    dependents,
    employees,
    employees_images,
    jobs,
    locations,
    mobil,
    project_assignments,
    projects,
    regions,
    users,
  };
}

const models = initModels(sequelize);

export default models
export {sequelize}

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
