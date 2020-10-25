const initialize = require('./index');
const connection = require('../db/database');

const readDepartments = () => {
    const sql = `SELECT * FROM department`

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
            // connection.end();
        })
        // .catch(console.log);
        .then( () => initialize());
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