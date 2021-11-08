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

//質問数取得
router.get('/selectTextCnt', (req, res) => {
    connection.getConnection((err, connection) => {
  
    connection.query('SELECT COUNT(*) AS cnt FROM question_tbl', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
});

router.post('/insertResult', (req, res)=> {
    const textCnt = req.body.textCnt
    const infoId = req.body.infoId
    const result1 = req.body.one
    const result2 = req.body.two
    const result3 = req.body.three
    const result4 = req.body.four
    const result5 = req.body.five
    const result6 = req.body.six
    const result7 = req.body.seven
    const result8 = req.body.eight
    const result9 = req.body.nine
    const result10 = req.body.ten
    const time = req.body.time

    let resultStr = ''
    let param = ''

    for(let x=1; x<=textCnt; x++){
        resultStr = resultStr + ", result" + x.toString()
        param = param + ", ?"
    }
    
    // const sql= `
    //     INSERT INTO 
    //         info_tbl (last_name_furi, first_name_furi, last_name, first_name, postal_num, prefecture_id, city, other_address, tel,
    //             result1, result2, result3, result4, result5, checkTime)
    //     VALUES 
    //         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    const sql= `
        INSERT INTO 
            result_tbl (info_id, checkTime` + resultStr + `)
        VALUES 
            (?, ?` + param + `);
        `

    connection.query(sql,[infoId, time, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10],(err,result)=>{
        if(err) console.log("err : "+err);
        res.send(result);
    });
});

module.exports = router;