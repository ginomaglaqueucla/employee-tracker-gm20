const connection = require('../db/database');

const readDepartments = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('in dep');
};

const createDepartment = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('create dep');
};

module.exports = {
    readDepartments,
    createDepartment
}