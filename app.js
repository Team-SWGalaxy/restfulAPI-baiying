var express = require('express');
var fs = require('fs');
var app = express();
var fsExist = require("./exist");

app.use('/item', require('./getSingleItem'));
app.use('/item', require('./addItem'));
app.use('/items', require('./getAllItems'));
app.use('/item', require('./deleteItem'));
app.use('/item', require('./updateItem'));

 app.listen(8081, function () {
 })