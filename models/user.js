'use strict';
const {
  Model
} = require('sequelize');
// const {Channel} = require('../models');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Channel,{
        foreignKey: 'User_id'
      });
    }
    
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.firstName} ${this.lastName}`;
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, 
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    hooks: {
      afterCreate: function(User, options) {
        const { transaction } = options;

        sequelize.models.Channel.create({
          User_id: User.id,
          title: `${User.fullName}-channel`
        },{transaction})
      }
    }
  });
  return User;
};