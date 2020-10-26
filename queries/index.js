const inquirer = require('inquirer');
const connection = require('../db/database');
const cTable = require('console.table');

const initialize = () => {
    // user message prompts
    let actionArray = [
        'View All Departments', 
        'View All Roles',
        'View All Employees', 
        'Add A Department', 
        'Add A Role', 
        'Add An Employee', 
        'Update An Employee Role'
    ];
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: actionArray,
        }
    ])
    // call function depending on user selection
    .then((userInput) => {
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
            return updateEmployeeRole();
        }
    })
};

// View All Departments
const readDepartments = () => {
    // sql query
    const sql = `SELECT name FROM department`;

    connection.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
        })
        // recall user prompts
        .then( () => initialize());
};

// View All Roles
const readRoles = () => {
    // sql query
    const sql = `SELECT title, salary, department.name AS department FROM role
    LEFT JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
        })
        // recall user prompts
        .then( () => initialize());
};

// View All Employees
const readEmployees = () => {
    // sql query
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM role
        RIGHT JOIN employee ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

    connection.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
        })
        // recall user prompts
        .then( () => initialize());
};

// Add A Department
const createDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'New Department name:'
        }
    ])
    .then(userInput => {
        // sql query
        const sql = `INSERT INTO department SET name=?`

        connection.promise().query(sql, userInput.depName)
        .then( () => readDepartments() );
    });
};

// Add A Role
const createRole = () => {
    // sql query
    const sql = `SELECT * FROM department`;
    connection.promise().query(sql)
        .then(([rows]) => {
            let departmentArray = [];
            rows.forEach(element => departmentArray.push({name: element.name, value: element.id}));
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
                let sql = `INSERT INTO role SET ?`;

                connection.promise().query(sql, userInput)
                .then( () => readRoles() );
            })
        })
};

// Add An Employee
const createEmployee = () => {
    // sql query
    let sql = `SELECT * FROM role`;
    connection.promise().query(sql)
        .then(([rows]) => {
            let roleArray = [];
            rows.forEach(element => roleArray.push({name: element.title, value: element.id}));

            // sql query
            sql = `SELECT * FROM employee`;
            connection.promise().query(sql)
                .then(([rows]) => {
                    let managerArray = [];
                    rows.forEach(element => managerArray.push({name: element.first_name+' '+element.last_name, value: element.id}));

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
                    // sql query
                    let sql = `INSERT INTO employee SET ?`;

                    connection.promise().query(sql, userInput)
                    .then( () => readEmployees() );
                })
        })
    })
};

// Update An Employee Role
const updateEmployeeRole = () => {
    // sql query
    let sql = `SELECT * FROM employee`;

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            let employeeArray = [];
            rows.forEach(element => employeeArray.push({name: element.first_name+' '+element.last_name, value: element.id}));

            // sql query
            sql = `SELECT * FROM role`;

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
                    // sql query
                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                    const params = [userInput.role_id, userInput.id];

                    connection.promise().query(sql, params)
                    .then( () => readEmployees() );
                })
        })
    })
};

module.exports = initialize;