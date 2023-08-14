import Bet from '../models/Bet';
import User from '../models/User';
import { Sequelize } from 'sequelize/types';

const betResolvers = {
  Query: {
    getBet: async (parent: any, args: any) => {
      const { id } = args;
      return await Bet.findByPk(id);
    },
    getBetList: async (parent: any, args: any) => {
      return await Bet.findAll();
    },
    getBestBetPerUser: async (parent: any, args: any, { sequelize }: { sequelize: Sequelize }) => {
      const { limit } = args;

      return await Bet.findAll({
        attributes: [
          'userId',
          [sequelize.fn('max', sequelize.col('betAmount')), 'betAmount'],
        ],
        group: ['userId'],
        order: [[sequelize.fn('max', sequelize.col('betAmount')), 'DESC']],
        limit,
        raw: true,
      })
    },
  },
  Mutation: {
    createBet: async (parent: any, args: any) => {
      const { userId, betAmount, chance } = args;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const randomValue = Math.random();
      const win = randomValue <= chance;
      const payout = win ? betAmount * (1 / chance) : 0;

      const bet = await Bet.create({
        userId,
        betAmount,
        chance,
        payout,
        win,
      });

      if (win) {
        user.balance += payout;
      } else {
        user.balance -= betAmount;
      }

      await user.save();

      return bet;
    },
  },
};

export default betResolvers;
