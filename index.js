const inquirer = require('inquirer');
const connection = require('./db/database');

const {readDepartments, createDepartment} = require('./queries/departmentQuery');
const {readRoles, createRole} = require('./queries/roleQuery');
const { readEmployees, createEmployee, updateEmployee, deleteEmployee}  = require('./queries/employeeQuery');
// const createEmployee = require('./queries/employeeQuery');
// const updateEmployee = require('./queries/employeeQuery');
// const deleteEmployee = require('./queries/employeeQuery');

const initialize = () => {
    console.log("in here");
    let actionArray = [
        'View All Departments', 
        'View All Roles', 
        'View All Employees', 
        'Add A Department', 
        'Add A Role', 
        'Add An Employee', 
        'Update An Employee Role', 
        'Remove An Employee'
    ];
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: actionArray,
        }
    ]).then((userInput) => {
        if(userInput.action === "View All Departments"){
            return readDepartments();
        }
        else if (userInput.action === "View All Roles"){
            return readRoles();
        }
        else if (userInput.action === "View All Employees"){
            return readEmployees();
        }
        else if (userInput.action === "Add A Department"){
            return createDepartment();
        }
        else if (userInput.action === "Add A Role"){
            return createRole();
        }
        else if (userInput.action === "Add An Employee"){
            return createEmployee();
        }
        else if (userInput.action === "Update An Employee Role"){
            console.log('egw');
            console.log(userInput.action)
            return updateEmployee();
        }
        else if (userInput.action === "Remove An Employee"){
            return deleteEmployee();
        }
    });

}



module.exports = initialize;