'use strict';

var express = require('express');
var fs = require("fs");
var express = require("express");
var router = express.Router();
const Promise = require('promise');
const _ = require('lodash');
const dataService = require('./server/dataService');
//import { getInitData } from './dataService';
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var rootPath = path.normalize(__dirname + '//');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(rootPath + '/client'));

app.use(express.static(rootPath + '/node_modules'));

app.listen(8080);

console.log('Listening on port 8080...');

app.post('/getSize', function(req, res) {
    dataService.getImageSizes(req.body.id).then(function(result) {
        res.send(result);
    });

});


app.get('/data', function(req, res, next) {
    dataService.getInitData().then(function(result) {
        res.send(result);
    });

});
