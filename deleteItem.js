var express = require('express');
var fs = require('fs');
var app = express();
var itemFileName = "./items.json";

app.delete('/:id', function (req, res, next) {
    var itemId = req.params.id;

    fs.readFile(itemFileName, "utf8", function (err, data) {
        if (err) {

            return next(err);
        }
        var items = JSON.parse(data);
        var notFound = null;
        var position = getIdPosition(items, itemId);
        if (position === notFound) {

            return res.status(404).end();
        }
        deleteItem(position, items, res,next)
    });
});

function getIdPosition(items, itemId) {
    for (var i = 0; i < items.length; i++) {
        if (itemId == items[i].id) {

            return i;
        }
    }

    return null;
}

function deleteItem(position, items, res,next) {
    items.splice(position, 1);

    fs.writeFile(itemFileName, JSON.stringify(items), function (err) {
        if (err) {
            
            return next(err);
        }
    });
    res.status(204).end();
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened on server');
});

module.exports = app;
