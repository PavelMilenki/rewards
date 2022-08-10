const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('../config');
const crypto = require("crypto");


const generateAccesToken = (id) => {
    return jwt.sign({id}, secret, {expiresIn: "24h"});
};

class authController {
    async registration(request, response) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({message: 'Registration error', errors});
            }
            const {login, password, firstName, lastName} = request.body;

            const loginExist = await User.findOne({login});

            if (loginExist) {
                return response.status(400).json({message: 'Login already exists'});
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const userId = crypto.randomBytes(16).toString("hex");

            const user = new User({login, password: hashPassword, firstName, lastName, userId});
            await user.save();
            return response.status(200).json({message: 'Login created'});
        } catch (e) {
            console.log(e);
            response.status(400).json({message: 'Registration error'});
        }
    }

    async login(request, response) {
        try {
            const {login, password} = request.body;
            const user = await User.findOne({login}, {userId: 1, firstName: 1, lastName: 1}).lean();
            if (!user) {
                return response.status(400).json({message: `login ${login} not found`});
            }
            const userPassword = await User.findOne({user: user.userId}, {password: 1}).lean();
            const validPassword = bcrypt.compareSync(password, userPassword.password);
            if (!validPassword) {
                return response.status(400).json({message: `password is not valid`});
            }
            const token = generateAccesToken(user._id);
            return response.json({token, userInfo: user});
        } catch (e) {
            console.log(e);
            response.status(400).json({message: 'Login error'});
        }
    }

    async isAuth(request, response) {
        try {
            const token = request?.headers?.authorization.slice(7);
            if (!token) {
                return response.status(200).json({auth: false, message: 'User is not authorized'});
            }
            request.user = jwt.verify(token, secret);
            return response.status(200).json({auth: true});
        } catch (e) {
            console.log(e);
            return response.status(403).json({message: 'User is not authorized'});
        }
    }
}

module.exports = new authController();
