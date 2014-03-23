// Dependencies
var lazy = require('lazy.js');
var isActive = require('./config').isActive;

// Constants
var DEFAULT_PER_PAGE = 30;
var MAX_PER_PAGE = 100;

var generateLink = function(url, queries, page) {
    var query = lazy(queries).union([
        'page=' + page
    ]).join('&');
    return encodeURI(url + '?' + query);
};

var generateLinkHeader = function(req, currentPage, lastPage, perPage) {
    var links = {};

    // Full URL to current resource excl. queries
    var url = [
        req.protocol + '://', // protocol
        req.get('host'), // domain
        req.path, // folder
    ].join('');

    // Queries excl. page
    var queries = ['perpage=' + perPage];
    for (var queryName in req.query) {
        if (queryName !== 'page' && queryName !== 'perpage') {
            queries.push(queryName + '=' + req.query[queryName]);
        }
    }

    // First page
    links.first = generateLink(url, queries, 1);

    // Next page
    if (currentPage < lastPage) {
        links.next = generateLink(url, queries, currentPage + 1);
    }

    // Prev page
    if (currentPage > 1) {
        links.prev = generateLink(url, queries, currentPage - 1);
    }

    // Last page
    links.last = generateLink(url, queries, lastPage);

    return links;
};

module.exports = function(req, res, next) {
    if (!isActive(req, 'pagination')) {
        return next();
    }

    var perPage = parseInt(req.query.perpage, 10) || DEFAULT_PER_PAGE;
    if (perPage < 1) {
        perPage = 1;
    } else if (perPage > MAX_PER_PAGE) {
        perPage = MAX_PER_PAGE;
    }

    var lastPage = Math.ceil(req.payload.size() / perPage);

    var page = parseInt(req.query.page, 10) || 1;
    if (page < 1) {
        page = 1;
    } else if (page > lastPage) {
        page = lastPage;
    }

    req.payload = req.payload.skip((page - 1) * perPage).take(perPage);

    res.links(generateLinkHeader(req, page, lastPage, perPage));

    next();
};
