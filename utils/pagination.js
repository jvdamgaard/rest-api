// Dependencies
var lazy = require('lazy.js');

// Constants
var DEFAULT_PER_PAGE = 30;
var MAX_PER_PAGE = 100;

var generateLinkHeader = function(req, currentPage, lastPage, perPage) {
    var links = {};

    // Navigate to page
    var prevPage = currentPage - 1;
    var nextPage = currentPage + 1;

    // Full URL to current resource excl. queries
    var fullUrl = [
        req.protocol + '://', // protocol
        req.get('host'), // domain
        req.path, // folder
    ].join('');

    // Queries excl. page
    var queries = ['per_page=' + perPage];
    for (var queryName in req.query) {
        if (queryName !== 'page' && queryName !== 'per_page') {
            queries.push(queryName + '=' + req.query[queryName]);
        }
    }

    // First page
    var firstQuery = lazy(queries).union(['page=1']).join('&');
    links.first = encodeURI(fullUrl + '?' + firstQuery);

    // Prev page
    if (prevPage > 0) {
        var prevQuery = lazy(queries).union([
            'page=' + prevPage
        ]).join('&');
        links.prev = encodeURI(fullUrl + '?' + prevQuery);
    }

    // Next page
    if (nextPage <= lastPage) {
        var nextQuery = lazy(queries).union([
            'page=' + nextPage
        ]).join('&');
        links.next = encodeURI(fullUrl + '?' + nextQuery);
    }

    // Last page
    var lastQuery = lazy(queries).union([
        'page=' + lastPage
    ]).join('&');
    links.last = encodeURI(fullUrl + '?' + lastQuery);

    return links;
};

module.exports = function(req, res, next) {
    if (!req.payloadIsArray) {
        return next();
    }

    var perPage = parseInt(req.query.per_page, 10) || DEFAULT_PER_PAGE;
    if (perPage < 1) {
        perPage = 1;
    } else if (perPage > MAX_PER_PAGE) {
        perPage = MAX_PER_PAGE;
    }

    var lastPage = Math.ceil(req.payload.size() / perPage);

    var page = parseInt(req.query.page, 10) || 1;
    if (page < 1) {
        page = 1;
    }
    if (page > lastPage) {
        page = lastPage;
    }

    req.payload = req.payload.skip((page - 1) * perPage).take(perPage);

    res.links(generateLinkHeader(req, page, lastPage, perPage));

    next();
};
