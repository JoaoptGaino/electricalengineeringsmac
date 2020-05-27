const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "eletric",
    port: '3308'
});



router.get('/',(req,res)=>{
    
});