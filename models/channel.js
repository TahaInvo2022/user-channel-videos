'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: "User_id",
      });
      this.hasOne(models.Video);
      
    }
  }
  Channel.init({
    title: DataTypes.STRING,
    User_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'Channel',
    tableName: 'Channels'
  });
  return Channel;
};