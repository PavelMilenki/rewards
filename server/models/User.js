const {Schema, model} = require('mongoose');


const User = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userId: {type: String},
});

module.exports = model('User', User);
