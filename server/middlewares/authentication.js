const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const authenticate = (request, response, next) => {
    if (request.method === "OPTIONS") {
        next();
    }
    try {
        const token = request.headers.authorization.slice(7);
        if (!token) {
            return response.status(403).json({auth: false, message: 'User is not authorized'});
        }
        request.user = jwt.verify(token, secret);
        next();
    } catch (e) {
        console.log(e);
        return response.status(403).json({message: 'User is not authorized'});
    }
};
module.exports = {
    authenticate,
};
