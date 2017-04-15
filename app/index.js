#!/bin/env node
var express = require('express');
var router = express.Router();
var fs      = require('fs');
var path = require('path');	
var bodyParser = require('body-parser');
var multer = require('multer');
var util = require('util');
require('shelljs/global');

var server_port = 8080

// Main application.
var app = express();
app.use('/', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

router.get('/cgi-bin', function(req, res) {
    semana  = req.query.valor1;
    usuario = req.query.valor2;
    ano     = req.query.valor3; 
    var sql = util.format('USE redmine; \
    SELECT sum(hours) as horas, spent_on \
    FROM time_entries, users \
    WHERE time_entries.user_id = users.id and user_id=%s and tweek=%s and tyear=%s \
    GROUP by spent_on;', usuario, semana, ano); 
    
    var horas = exec( 
        util.format('mysql -hredmine-mysql -uroot -p"$DB_PASSWORD" --execute="%s"', sql)
    ).stdout;

    res.send(horas);  
});

// Start listening.
app.listen(server_port, function(){
  console.log("Listening on server_port " + server_port)
});
