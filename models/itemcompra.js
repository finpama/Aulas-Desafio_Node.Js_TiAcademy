'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCompra extends Model {
    static associate(models) {
      // define association here
      ItemCompra.belongsTo(models.Compra, { foreignKey: 'CompraId', as: 'it_Compra' })
      ItemCompra.belongsTo(models.Produto, { foreignKey: 'ProdutoId', as: 'it_Produto' })
    }
  }
  ItemCompra.init({
    PedidoId: DataTypes.INTEGER,
    ServicoId: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemCompra',
  });
  return ItemCompra;
};