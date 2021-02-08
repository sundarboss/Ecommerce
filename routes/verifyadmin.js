function verifyAdmin(req, res, next) {
    if (!req.admin) {
        return res.status(401).send('Inappropriate user');
    }
    next();
}

module.exports = verifyAdmin;