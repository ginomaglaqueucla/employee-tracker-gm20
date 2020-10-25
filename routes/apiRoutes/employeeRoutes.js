const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// const inputCheck = require('../../utils/inputCheck');

router.get('/employee', (req, res) => {
    // db("employeeCreate");
    // res.json();
    const sql =  `SELECT employee.*, role.name 
    AS role_name 
    FROM employee 
    LEFT JOIN role 
    ON candidates.role_id = role.id`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;