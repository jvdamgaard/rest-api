// Dependencies
var fs = require('fs');
var path = require('path');

var features = {};
if (fs.existsSync(path.resolve(__dirname, '../config/features.json'))) {
    features = require('../config/features.json');
} else {
    console.log('`./config/features.json` could not be loaded. All features will be turned off.');
}

module.exports = function(feature) {
    var isEnabled = (features[feature] === true);
    if (process.env.NODE_ENV === 'build') {
        isEnabled = true;
    }
    return {
        isEnabled: isEnabled
    };
};

module.exports.enable = function(feature) {
    features[feature] = true;
};

module.exports.disable = function(feature) {
    features[feature] = false;
};
