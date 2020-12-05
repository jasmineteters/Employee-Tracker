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
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add All Departments",
        "Add All Roles",
        "Add All Employees",
        "Update an Employee Role",
      ],
    })
    .then(function (answer) {
      switch (answer.whatAction) {
        case "View All Employees":
          viewEmployees();
          break;

        case "Add an Employee":
          addEmployee();
          break;
        case "Remove an Employee":
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

function viewRoles() {}

function addRoles() {}

function viewDepartments() {}

function addDepartments() {}

function updateEmployees() {}
