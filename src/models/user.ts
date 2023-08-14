import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

class User extends Model {
  public id!: number;
  public name!: string;
  public balance!: number;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'user' }
);

export default User;
