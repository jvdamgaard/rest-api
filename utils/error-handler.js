var transformOutput = require('./transform-output');

var errorCodeLookUp = {
    '-1': {
        moreInfo: 'http://developer.dansksupermarked.dk/',
        statusCode: 404
    }
};

module.exports = function(req, res, error) {
    error = error || {};
    error.code = '' + error.code || '-1';
    error.developerMessage = error.developerMessage || 'No descript for this error. Please send a mail to teamfotexnetto@gmail.com';
    error.userMessage = error.userMessage || 'The Dansk Supermarked API unexpected produced an error. Please try again.';
    error.moreInfo = errorCodeLookUp[error.code].moreInfo || errorCodeLookUp['-1'].moreInfo;

    req.payload = error;
    req.status = errorCodeLookUp[error.code].statusCode || errorCodeLookUp['-1'].statusCode;

    transformOutput(req, res);
};
