const connection = require('../db/database');

const createEmployee = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('create emp');
};

const readEmployees = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('in emp');
};

const updateEmployee = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('updaterew emp');
};

const deleteEmployee = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('delete1 emp');
};

module.exports = {createEmployee, readEmployees, updateEmployee, deleteEmployee};

