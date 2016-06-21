var express = require('express');
var fs = require('fs');
var app = express();
var itemFileName = "items.json";

app.get('/:id', function (req, res, next) {
    var itemId = req.params.id;

    fs.readFile(itemFileName, "utf8", function (err, data) {
        var items = JSON.parse(data);

        if (err) {
            
            return next(err);
        }
        else {
            findItemData(items, itemId, res);
        }

    });
})

function findItemData(items, itemId, res) {
    for (var i = 1; i < items.length; i++) {
        if (itemId == items[i].id) {
            var item = items[i];
            res.status(200).json(item);
        }
    }
    res.status(404).end();
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened on server');
});

module.exports = app;