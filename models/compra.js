'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      // define association here
      Compra.belongsTo(models.Cliente, { foreignKey: 'ClienteId', as: 'com_Cliente' });
      Compra.belongsToMany(models.Produto, { foreignKey: 'CompraId', through: 'ItemCompra'});
      Compra.hasMany(models.ItemCompra, { foreignKey: 'CompraId', as: 'com_Itens' })
    }
  }
  Compra.init({
    ClienteId: DataTypes.INTEGER,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};