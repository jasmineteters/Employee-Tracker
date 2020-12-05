const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "rootpass",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "whatAction",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    })
    .then(function (answer) {
      switch (answer.whatAction) {
        case "View all Employees":
          viewEmployees();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Departments":
          viewDepartments();
          break;
        case "Add a Department":
          addDepartments();
          break;
        case "Add a Role":
          addRoles();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployees();
          break;
      }
    });
}

function viewEmployees() {
  const query = `SELECT CONCAT (e.first_name, " ", e.last_name) AS "Full Name", 
                 r.title, r.salary, d.name AS "department name"
                 FROM employees AS e
                 LEFT JOIN roles AS r 
                 ON e.role_id = r.id
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    connection.end();
  });
}

function addEmployee() {}

function viewRoles() {
  const query = `SELECT r.title, d.name AS "department name"
                 FROM roles AS r
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    connection.end();
  });
}

function addRoles() {}

function viewDepartments() {
  const query = `SELECT d.name AS "department name", d.id
                 FROM departments AS d`;

  connection.query(query, function (err, res) {
    console.table(res);
    connection.end();
  });
}

function addDepartments() {}

function updateEmployees() {}
