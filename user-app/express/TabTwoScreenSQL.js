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

router.get('/selectInfos', (req, res) => {
    connection.getConnection((err, connection) => {

    connection.query('SELECT * FROM info_tbl', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
});

router.get('/selectRowCnt', (req, res) => {
  connection.getConnection((err, connection) => {

  connection.query('SELECT COUNT(*) AS cnt FROM info_tbl', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});
});

router.post('/insertInfos', (req, res)=> {
  const id = req.body.id
  const lastFuri = req.body.last_name_furi
  const firstFuri = req.body.first_name_furi
  const lastName = req.body.last_name
  const firstName = req.body.first_name
  const postalNum = req.body.postal_num
  const prefecture = req.body.prefecture_id
  const city = req.body.city
  const otherAdd = req.body.other_address
  const tel = req.body.tel

  const sql= `
    INSERT INTO 
      info_tbl(id, last_name_furi, first_name_furi, last_name, first_name, postal_num, prefecture_id, city, other_address, tel)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      last_name_furi= VALUES(last_name_furi),
      first_name_furi= VALUES(first_name_furi),
      last_name= VALUES(last_name),
      first_name= VALUES(first_name),
      postal_num= VALUES(postal_num),
      prefecture_id= VALUES(prefecture_id),
      city= VALUES(city),
      other_address= VALUES(other_address),
      tel= VALUES(tel);`
  
  connection.query(sql,[id, lastFuri, firstFuri, lastName, firstName, postalNum, prefecture, city, otherAdd, tel],(err,result)=>{
      if(err) console.log("err : "+err);
      res.send(result);
  });
});
  
module.exports = router;