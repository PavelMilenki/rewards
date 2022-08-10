const {Schema, model} = require('mongoose');


const Rewards = new Schema({
    forUserId: {type: String},
    fromUserId: {type: String},
    createOn: {type: Date},
    description: {type: String},
    rewardValue: {type: Number},
});

module.exports = model('Rewards', Rewards);
