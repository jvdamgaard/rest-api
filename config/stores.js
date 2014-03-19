module.exports = {
    request: {
        aliases: []
    },
    response: {
        filter: true,
        sort: true,
        pagination: true,
        limitFields: true,
        methods: [
            // Calc distance from geoposition
            function(req, res, next) {
                // Calc distance
                next();
            }
        ]
    },
    cache: {
        request: 60,
        service: 600
    },
    service: {
        url: ''
    }
};
