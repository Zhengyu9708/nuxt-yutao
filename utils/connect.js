const mongoose = require('mongoose');
const hostname = "0.0.0.0";
const port = 27017;
const dbName = "wh1909";
const DB_CONN_STR = `mongodb://${hostname}:${port}/${dbName}`;
mongoose.connect(DB_CONN_STR,{useUnifiedTopology: true,useNewUrlParser:true});
const connection = mongoose.connection;
connection.on("connected",()=>{
    console.log("mongodb 数据库连接成功")
})
connection.on("open",()=>{
    console.log("mongodb 连接开启")
})
connection.on("error",(err)=>{
    console.log(err)
})
connection.on("disconnected",()=>{
    console.log("mongodb 断开连接")
})
module.exports = connection;