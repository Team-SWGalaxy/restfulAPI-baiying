/**
 * Created by baiying on 16-6-5.
 */
var express = require('express');
var fs = require('fs');
var app = express();
var itemFileName = "./items.json";

app.get('/', function (req, res,next) {
    fs.readFile(itemFileName , 'utf8', function (err, data) {
     var items = JSON.parse(data);
        if (err) {

            return next(err);
        }
        res.status(200).send(items);
    });
})

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened on server!');
});

module.exports = app;