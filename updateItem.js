var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var itemFileName = "items.json";

app.put('/:id', function (req, res, next) {
    var itemId = req.params.id;

    fs.readFile(itemFileName, "utf8", function (err, data) {
        if (err) {

            return next(err);
        }
        else {
            var items = JSON.parse(data);
            updateItemData(itemId, items, req, res, next);
        }
    });
});

function updateItemData(itemId, items, req, res, next) {
    var correctType = true;

    if (judgeType(req) != correctType) {
        res.status(404).end();
    }
    else {
         writeItemData(itemId, items, req,res,next);
    }
}

function judgeType(req) {
    if (typeof(req.body.name) === 'string' && typeof(req.body.unit) === 'string' && typeof (req.body.price) === 'number') {

        return true;
    }
}

function writeItemData(itemId, items, req,res,next) {
    for (var i = 0; i < items.length; i++) {
        if (itemId == items[i].id) {
            var item = {
                id: items[i].id,
                barcode: req.body.barcode,
                name: req.body.name,
                unit: req.body.unit,
                price: req.body.price
            }
            items[i] = item;

            fs.writeFile(itemFileName, JSON.stringify(items), function (err) {
                if (err) {

                    return next(err);
                }
                res.status(200).send(item);
            });
        }
    }
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened on server');
});

module.exports = app;