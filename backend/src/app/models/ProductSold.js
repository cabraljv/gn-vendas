import Sequelize, { Model } from 'sequelize';

class ProductSold extends Model {
  static init(sequelize) {
    super.init(
      {
        product_price: Sequelize.INTEGER,
        amount: Sequelize.INTEGER,
      },
      {
        tableName: 'products_sold',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
    this.belongsTo(models.Sale, {
      foreignKey: 'sale_id',
      as: 'sale',
    });
  }
}

export default ProductSold;
