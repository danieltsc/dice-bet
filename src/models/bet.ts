import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';
import User from './User';

class Bet extends Model {
  public id!: number;
  public userId!: number;
  public betAmount!: number;
  public chance!: number;
  public payout!: number;
  public win!: boolean;
}

Bet.init(
  {
    betAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    chance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payout: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'bet' }
);

Bet.belongsTo(User);

export default Bet;
