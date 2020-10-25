const connection = require('../db/database');

const readRoles = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('in role');
};

const createRole = () => {
    // const sql = `SELECT * FROM department`

    // // display the information then reprompt the user with the questions
    // connection.promise().query(sql)
    //     .then(([rows]) => {
    //         console.log('\n');
    //         console.table(rows);
    //     })
    //     .then(() => startApplication());
    console.log('create role');
};

module.exports = {
    readRoles,
    createRole
}