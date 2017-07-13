var fs = require('fs-extra');

var source = './dist/*';
var dest = '<%= localExtensionDir %>';

fs.copy(source, dest, function (err) {

    if (err)
    {
        return console.error(err);
    }

    console.log('Copied to ' + dest);

});
