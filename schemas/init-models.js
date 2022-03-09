var DataTypes = require("sequelize").DataTypes;
var _car = require("./car");
var _countries = require("./countries");
var _departments = require("./departments");
var _dependents = require("./dependents");
var _employees = require("./employees");
var _employees_images = require("./employees_images");
var _jobs = require("./jobs");
var _locations = require("./locations");
var _mobil = require("./mobil");
var _project_assignments = require("./project_assignments");
var _projects = require("./projects");
var _regions = require("./regions");
var _users = require("./users");

function initModels(sequelize) {
  var car = _car(sequelize, DataTypes);
  var countries = _countries(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var dependents = _dependents(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var employees_images = _employees_images(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);
  var locations = _locations(sequelize, DataTypes);
  var mobil = _mobil(sequelize, DataTypes);
  var project_assignments = _project_assignments(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

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
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
