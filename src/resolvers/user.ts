import User from '../models/User';

const userResolvers = {
  Query: {
    getUser: async (parent: any, args: any) => {
      const { id } = args;
      return await User.findByPk(id);
    },
    getUserList: async (parent: any, args: any) => {
      return await User.findAll();
    },
  },
  Mutation: {
    createUser: async (parent: any, args: any) => {
      const { name, balance } = args;

      const user = await User.create({
        name,
        balance
      });

      return user;
    },
  },
};

export default userResolvers;
