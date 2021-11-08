//サーバーとの経路を生成する
const express = require('express');

//DBからデータ呼出すとき
// const bodyParser = require('body-parser');
const app = express();

const modalSQL = require("./ModalSQL");
const tabTwoScreenSQL = require("./TabTwoScreenSQL");
const modalCompleteSQL = require("./ModalCompleteSQL");

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/modal", modalSQL);
app.use("/tabTwo", tabTwoScreenSQL);
app.use("/modalComplete", modalCompleteSQL);

app.listen(3000, () => {
//  console.log('Go to http://localhost:3000/tabTwo/infos so you can see the data.');
 console.log('port 3000 listen OK');
});
