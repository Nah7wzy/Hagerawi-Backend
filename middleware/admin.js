require('../models/models.js');
module.exports = function (req, res, next) {
    // 401 unauthorized 
    // 403 forbidden 
    if (!req.isAdmin) return res.status(403).send("Access denied.");
    next();
}