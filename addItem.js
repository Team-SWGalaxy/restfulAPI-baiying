var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var itemFileName = "./items.json";
var newIdFileName = "./New-id.json";

app.post('/', function (req, res, next) {
    fs.readFile(itemFileName, "utf8", function (err, itemsData) {
        if (err) {

            return next(err);
        }
        else {
            var items = JSON.parse(itemsData);
            insertItemData(items, req, res,next);
        }
    });
});

function insertItemData(items, req, res,next) {
    fs.readFile(newIdFileName, "utf8", function (err, data) {
        if (err) {

            return next(err);
        }
        var correctType = true;
        var result = judgeType(req);
        if (result != correctType) {
            return res.status(404).end();
        }
        var idData = JSON.parse(data);
        var id = idData.newId;
        var item = {
            id: id,
            barcode: req.body.barcode,
            name: req.body.name,
            unit: req.body.unit,
            price: req.body.price
        }
        items.push(item);

        fs.writeFile(itemFileName, JSON.stringify(items), function (err) {
            if (err) {

                return next(err)
            }
            res.status(200).send(item);
        });
        var newData = {
            newId: ++id
        }

        fs.writeFile(newIdFileName, JSON.stringify(newData), function (err) {
            if (err) {
                
                return next(err);
            }
        });

    });
}

function judgeType(req) {
    if (typeof(req.body.barcode) === 'string' && typeof(req.body.name) === 'string' && typeof(req.body.unit) === 'string' && typeof (req.body.price) === 'number') {

        return true;
    }
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened on server');
});

module.exports = app;