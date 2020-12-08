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
        "Exit",
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
          updateEmployeeRoles();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

// Viewing all employees
function viewEmployees() {
  const query = `SELECT CONCAT (e.first_name, " ", e.last_name) AS "full name", 
                 r.title, r.salary, d.name AS "department name"
                 FROM employees AS e
                 LEFT JOIN roles AS r 
                 ON e.role_id = r.id
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    start();
  });
}

// Viewing all Roles with their departments
function viewRoles() {
  const query = `SELECT r.title, d.name AS "department name"
                 FROM roles AS r
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    start();
  });
}

// viewing all departments and their corresponding id.
function viewDepartments() {
  const query = `SELECT d.name AS "department name", d.id AS department_id FROM departments AS d`;

  connection.query(query, function (err, res) {
    console.table(res);
    start();
  });
}

function addRoles() {
  const query = `SELECT r.title, d.name AS "department name"
                 FROM roles AS r
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the name of the role you'd like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
        },
        {
          name: "departmentID",
          type: "input",
          message: "What is the department ID that this role belongs to?",
        },
      ])
      .then(function (res) {
        var query = `INSERT INTO roles (title, salary, department_id) VALUES ("${res.roleTitle}", ${res.salary}, ${res.departmentID});`;

        const addedQuery = `SELECT r.title, d.name AS "department name"
                            FROM roles AS r
                            LEFT JOIN departments AS d 
                            ON r.department_id = d.id`;

        var query = connection.query(query, function (err, res) {
          if (err) {
            console.log(err);
          }
          console.table(res);
          connection.query(addedQuery, function (err, res) {
            console.table(res);
            start();
          });
        });
      });
  });
}

function addEmployee() {
  const query = `SELECT CONCAT (e.first_name, " ", e.last_name) AS "full name", 
                 r.title, r.salary, d.name AS "department name"
                 FROM employees AS e
                 LEFT JOIN roles AS r 
                 ON e.role_id = r.id
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the first name of this employee?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the last name of this employee",
        },
        {
          name: "roleID",
          type: "input",
          message: "What is their role ID?",
        },
        {
          name: "managerID",
          type: "input",
          message: "who is their managers ID?",
        },
      ])
      .then(function (res) {
        var query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", "${res.roleID}", ${res.managerID});`;

        const addedQuery = `SELECT CONCAT (e.first_name, " ", e.last_name) AS "full name", 
                            r.title, r.salary, d.name AS "department name"
                            FROM employees AS e
                            LEFT JOIN roles AS r 
                            ON e.role_id = r.id
                            LEFT JOIN departments AS d 
                            ON r.department_id = d.id`;

        var query = connection.query(query, function (err, res) {
          if (err) {
            console.log(err);
          }
          console.table(res);
          connection.query(addedQuery, function (err, res) {
            console.table(res);
            start();
          });
          // console.log(query.sql);
        });
      });
  });
}

function addDepartments() {
  const query = `SELECT d.name AS "department name", d.id AS department_id FROM departments AS d`;

  connection.query(query, function (err, res) {
    console.table(res);
    inquirer
      .prompt([
        {
          name: "deptName",
          type: "input",
          message: "What is the name of this department?",
        },
      ])
      .then(function (res) {
        var query = `INSERT INTO departments (name) VALUES ("${res.deptName}");`;

        const addedQuery = `SELECT d.name AS "department name", d.id AS department_id FROM departments AS d`;

        var query = connection.query(query, function (err, res) {
          if (err) {
            console.log(err);
          }
          // console.table(res);
          connection.query(addedQuery, function (err, res) {
            console.table(res);
            start();
          });
          // console.log(query.sql);
        });
      });
  });
}

function updateEmployeeRoles() {
  const query = `SELECT CONCAT (e.id, " ", e.first_name, " ", e.last_name) AS "full name", 
                 r.title, r.salary, d.name AS "department name"
                 FROM employees AS e
                 LEFT JOIN roles AS r 
                 ON e.role_id = r.id
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

  connection.query(query, function (err, res) {
    console.table(res);
    inquirer
      .prompt([
        {
          name: "employeeID",
          type: "input",
          message: "What is this employee's ID?",
        },
        {
          name: "updatedRoleID",
          type: "input",
          message: "What is the new role ID for this employee?",
        },
      ])
      .then(function (res) {
        var query = `UPDATE employees SET role_id = ${res.updatedRoleID}  WHERE id = ${res.employeeID};`;

        const addedQuery = `SELECT CONCAT (e.id, " ", e.first_name, " ", e.last_name) AS "full name", 
                 r.title, r.salary, d.name AS "department name"
                 FROM employees AS e
                 LEFT JOIN roles AS r 
                 ON e.role_id = r.id
                 LEFT JOIN departments AS d 
                 ON r.department_id = d.id`;

        var query = connection.query(query, function (err, res) {
          if (err) {
            console.log(err);
          }
          // console.table(res);
          connection.query(addedQuery, function (err, res) {
            console.table(res);
            start();
          });
          // console.log(query.sql);
        });
      });
  });
}
