'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SampleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SampleData.init({
    addressOne: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    east: DataTypes.STRING,
    west: DataTypes.STRING,
    north: DataTypes.STRING,
    south: DataTypes.STRING,
    street: DataTypes.STRING,
    shopName: DataTypes.STRING,
    discount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SampleData',
    tableName: "sample_datas"
  });
  return SampleData;
};