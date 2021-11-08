//サーバーとの経路を生成する
const express = require('express');

//DBからデータ呼出すとき
// const bodyParser = require('body-parser');
const app = express();

const tabOneScreenSQL = require("./TabOneScreenSQL");
const tabTwoScreenSQL = require("./tabTwoScreenSQL");

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/tabOne", tabOneScreenSQL);
app.use("/tabTwo", tabTwoScreenSQL);

app.listen(3000, () => {
//  console.log('Go to http://localhost:3000/tabTwo/infos so you can see the data.');
 console.log('port 3000 listen OK');
});
