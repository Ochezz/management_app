//サーバーとの経路を生成する
const express = require('express');
const router = express.Router();

//MySqlモジュール、データベースとの連係
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'docker',
  password : 'docker',
  database : 'management_app_db'
});

router.get('/selectPrefecture', (req, res) => {
  connection.getConnection((err, connection) => {

    connection.query('select prefecture_id from info_tbl group by prefecture_id', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.get('/selectQuestion', (req, res) => {
  connection.getConnection((err, connection) => {

    connection.query('select text from question_tbl', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.get('/selectCity/:prefecture', (req, res) => {
  connection.getConnection((err, connection) => {

    let prefecture = (req.params.prefecture !== null ? req.params.prefecture : '%')

    connection.query('select city from info_tbl where prefecture_id like ? group by city', [prefecture], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.post('/selectFilteredInfo', (req, res) => {

  const prefecture = req.body.prefecture
  const cityValue = req.body.cityValue
  const result = req.body.resultCheck

  let sql = `
    select
      i1.id as id,
      i1.last_name_furi as last_name_furi,
      i1.first_name_furi as first_name_furi,
      i1.last_name as last_name,
      i1.first_name as first_name,
      i1.postal_num as postal_num,
      i1.prefecture_id as prefecture_id,
      i1.city as city,
      i1.other_address as other_address,
      i1.tel as tel,
      r1.checkTime as checkTime,
      r1.result1 as result1,
      r1.result2 as result2,
      r1.result3 as result3,
      r1.result4 as result4,
      r1.result5 as result5,
      r1.result6 as result6,
      r1.result7 as result7,
      r1.result8 as result8,
      r1.result9 as result9,
      r1.result10 as result10
    from
      info_tbl i1 left outer join result_tbl r1
    on
      i1.id = r1.info_id
  `
  let where = `
    where
      (case when (select max(checkTime) from result_tbl where r1.info_id = info_id group by info_id) is NULL then 1 else r1.checkTime end)
      =
      COALESCE((select max(checkTime) from result_tbl where r1.info_id = info_id group by info_id), 1)
    and
  `

  let orderby = ' order by i1.id'

  let preparedArray = []

  var keys = Object.keys( result );
  for( let i = 0; i < keys.length; i++ ) {
    if (result[ keys[i] ] !== null) {
      where += "r1." + keys[i] + " = ? and "
      preparedArray.push(result[ keys[i] ])
    } 
  }

  if (prefecture !== null) {
    where += 'i1.prefecture_id = ? '
    preparedArray.push(prefecture)

    if (cityValue !== null) {
      where += 'and i1.city = ?'
      preparedArray.push(cityValue)
    }
  } else {
    where += "1 = 1"
  }

  sql += where + orderby

  connection.getConnection((err, connection) => {

    connection.query(sql, preparedArray, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
    connection.release()
  });
});

router.get('/selectInfoOne/:id', (req, res) => {
  
  connection.getConnection((err, connection) => {
    
      let infoSql = `
        select
          *
        from
          info_tbl
        where
          id = ?
        `
        
        let resultSql = `
          select
            *
          from
            result_tbl
          where
            checkTime = (select max(checkTime) from result_tbl where info_id = ?)
          and
            info_id = ?
        `
        
      let responseData = {}
  
      let getInfo = connection.query(infoSql, [req.params.id], (error, results, fields) => {
        if (error) throw error;
        responseData['info'] = results
      });
      
      let getResult = connection.query(resultSql, [req.params.id, req.params.id], (error, results, fields) => {
        if (error) throw error;
        responseData['results'] = results
        sendResponse()
      });

      const sendResponse = () => {
        res.send(responseData);
        connection.release()
      }
  
  });
});

router.post('/insertInfos', (req, res)=> {
  const lastFuri = req.body.last_name_furi
  const firstFuri = req.body.first_name_furi
  const lastName = req.body.last_name
  const firstName = req.body.first_name
  const postalNum = req.body.postal_num
  const prefecture = req.body.prefecture_id
  const city = req.body.city
  const otherAdd = req.body.other_address
  const tel = req.body.tel
  const date = req.body.date
  const result1 = req.body.result1
  const result2 = req.body.result2
  const result3 = req.body.result3
  const result4 = req.body.result4
  const result5 = req.body.result5

  const sql= `
    INSERT INTO 
      info_tbl(last_name_furi, first_name_furi, last_name, first_name, postal_num, prefecture_id, city, other_address, tel, checkTime, result1, result2, result3, result4, result5)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      last_name_furi= VALUES(last_name_furi),
      first_name_furi= VALUES(first_name_furi),
      last_name= VALUES(last_name),
      first_name= VALUES(first_name),
      postal_num= VALUES(postal_num),
      prefecture_id= VALUES(prefecture_id),
      city= VALUES(city),
      other_address= VALUES(other_address),
      tel= VALUES(tel),
      checkTime= VALUES(checkTime),
      result1= VALUES(result1),
      result2= VALUES(result2),
      result3= VALUES(result3),
      result4= VALUES(result4),
      result5= VALUES(result5);`
  
  connection.query(sql,[lastFuri, firstFuri, lastName, firstName, postalNum, prefecture, city, otherAdd, tel, date, result1, result2, result3, result4, result5],(err,result)=>{
      if(err) console.log("err : "+err);
      res.send(result);
  });
});

module.exports = router;