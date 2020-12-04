const mysql = require("mysql");
const inquirer = ("inquirer");
const cTable = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    startSearch();
});

function startSearch() {
    inquirer
        .prompt({

        })
}