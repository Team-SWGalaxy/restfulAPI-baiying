var fs = require('fs');
fs.exists('items.json', function (exists) {
    if (!exists) {
        fs.open('./items.json', 'w', function (err) {
            if (err) {
                return;
            }
             fs.writeFile('items.json', "[]", function (err) {
                if (err) {
                   throw err;
                 }
             });
        });
    }
});
fs.exists('New-id.json', function (exists) {
    if (!exists) {
        fs.open('./New-id.json', 'w', function (err) {
            if (err) {
                return;
            }
            var data = {
                newId:1
            }
            fs.writeFile('New-id.json', JSON.stringify(data), function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    }
});