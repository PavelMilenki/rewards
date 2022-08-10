const Rewards = require('../models/Rewards');
const User = require('../models/User');

class rewardsController {

    async getAllRewards(request, response) {
        try {
            let rewards = await Rewards.find().lean();
            rewards = await Promise.all(rewards.map(async (reward) => {
                const fromUser = await User.findOne({userId: reward.fromUserId}, {firstName: 1, lastName: 1}).lean();
                const forUser = await User.findOne({userId: reward.forUserId}, {firstName: 1, lastName: 1}).lean();
                return {
                    ...reward,
                    forUserName: `${forUser.firstName} ${forUser.lastName}`,
                    fromUserName: `${fromUser.firstName} ${fromUser.lastName}`,
                };
            }));
            const users = await User.find({}, {firstName: 1, lastName: 1, userId: 1});
            response.json({rewards, users});
        } catch (e) {
            console.log(e);
        }
    }

    async addRewards(request, response) {
        try {
            const {forUserId, fromUserId, description, rewardValue} = request.body;
            const reward = new Rewards({
                forUserId,
                fromUserId,
                description,
                rewardValue,
                createOn: new Date(),
            });
            await reward.save();
            return response.status(200).json({message: 'New reward has added'});
        } catch (e) {
            console.log(e);
            response.status(403).json({message: 'error'});
        }
    }
}

module.exports = new rewardsController();
