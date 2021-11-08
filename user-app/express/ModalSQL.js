//サーバーとの経路を生成する
const express = require('express');
const router = express.Router();

//MySqlモジュール、データベースとの連係
const mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'docker',
    password : 'docker',
    database : 'management_app_db'
});

router.get('/selectTexts', (req, res) => {
    connection.getConnection((err, connection) => {

    connection.query('SELECT * FROM question_tbl', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
});
  
module.exports = router;