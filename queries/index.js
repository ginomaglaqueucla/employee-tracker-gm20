const inquirer = require('inquirer');
const connection = require('../db/database');

// const {readDepartments, createDepartment} = require('./departmentQuery');
// const {readRoles, createRole} = require('./roleQuery');
const {deleteEmployee}  = require('./employeeQuery');
// const { readEmployees, createEmployee, updateEmployee, deleteEmployee}  = require('./employeeQuery');


const initialize = () => {
    let finsihedFlag = false;
    let promise;
    let testArray = [];
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
    })
    // .then(() => initialize());
    // promise.then(;
};

const readDepartments = () => {

    const sql = `SELECT name FROM department`

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            // return rows;
            // connection.end();
        })
        .then( () => initialize());
};

const readRoles = () => {
    const sql = `SELECT title, salary, department.name AS department FROM role
    LEFT JOIN department ON role.department_id = department.id`

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            // connection.end();
        })
        .then( () => initialize());
};

const readEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM role
        RIGHT JOIN employee ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            // connection.end();
        })
        .then( () => initialize());
};

const createDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'New Department name:'
        }
    ])
    .then(userInput => {
        const sql = `INSERT INTO department SET name=?`

        // display the information then reprompt the user with the questions
        connection.promise().query(sql, userInput.depName)
            .then(([rows]) => {
                console.log('\n');
                console.table(rows);
            })
            .then( () => readDepartments() );
    });
};
// const createRole = () => {
//     return;
// };
const createRole = () => {
    const sql = `SELECT * FROM department`
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            const departmentArray = rows.map(data =>
                ({name: data.name, value: data.id})); 
            console.log(departmentArray);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'New Role title:'
                },
                { 
                    type: 'input',
                    name: 'salary',
                    message: 'Salary:'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Choose Department:',
                    choices: departmentArray
                }
            ])
            .then(userInput => {
                let sql = `INSERT INTO role SET ?`
                // display the information then reprompt the user with the questions
                connection.promise().query(sql, userInput)
                .then( () => readRoles() );
            })
        })
};

const createEmployee = () => {
    let sql = `SELECT * FROM role`
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            const roleArray = rows.map(data =>
                ({name: data.title, value: data.id}));
            console.log(roleArray);

            sql = `SELECT * FROM employee`
            connection.promise().query(sql)
                .then(([rows, fields]) => {
                    const managerArray = rows.map(data =>
                        ({name: data.last_name, value: data.id}));
                    console.log(managerArray);

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'First Name:'
                    },
                    { 
                        type: 'input',
                        name: 'last_name',
                        message: 'Last Name:'
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Choose Role:',
                        choices: roleArray
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Choose Manager:',
                        choices: managerArray
                    }
                ])
                .then(userInput => {
                    let sql = `INSERT INTO employee SET ?`
                    // display the information then reprompt the user with the questions
                    connection.promise().query(sql, userInput)
                    .then( () => readEmployees() );
                })
        })
    })
};

const updateEmployee = () => {
    let sql = `SELECT * FROM employee`
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            const employeeArray = rows.map(data =>
                ({name: data.last_name, value: data.id}));

            sql = `SELECT * FROM role`
            connection.promise().query(sql)
                .then(([rows, fields]) => {
                    const rolesArray = rows.map(data =>
                        ({name: data.title, value: data.id}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: 'Choose Employee:',
                        choices: employeeArray
                    },
                    { 
                        type: 'list',
                        name: 'role_id',
                        message: 'Choose Role:',
                        choices: rolesArray
                    }
                ])
                .then(userInput => {
                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
                    const params = [userInput.role_id, userInput.id];
                    // display the information then reprompt the user with the questions
                    connection.promise().query(sql, params)
                    .then( () => readEmployees() );
                })
        })
    })
};





module.exports = initialize;