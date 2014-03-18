module.exports.send = function(req, res) {
    if (!req.status) {
        return res.status(404).json({
            error: 'Resource not found'
        });
    }
    return res.json(req.status, req.payload);
};
