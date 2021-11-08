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

router.post('/insertQuestion', (req, res) => {

  const question = req.body.question

  let sql = `
    INSERT INTO question_tbl
      (text)
    VALUES
      (?)
  `
  connection.getConnection((err, connection) => {

    connection.query(sql, [question], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.get('/selectQuestions', (req, res) => {
  connection.getConnection((err, connection) => {

    connection.query('select * from question_tbl order by id', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.post('/deleteQuestion', (req, res) => {

  const id = req.body.id

  let sql = `
    delete from question_tbl where id = ?
  `
  connection.getConnection((err, connection) => {

    connection.query(sql, [id], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.post('/updateQuestion', (req, res) => {

  const text = req.body.text
  const id = req.body.id

  let sql = `
    update question_tbl set text = ? where id = ?
  `
  connection.getConnection((err, connection) => {

    connection.query(sql, [text, id], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

module.exports = router;