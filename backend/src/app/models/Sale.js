import Sequelize, { Model } from 'sequelize';
import { isBefore, addDays } from 'date-fns';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        boleto_url: Sequelize.STRING,
        boleto_id: Sequelize.STRING,
        vencido: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.updated_at, addDays(new Date(), 2));
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsToMany(models.Product, {
      through: models.ProductSold,
      as: 'products',
    });
  }
}

export default Sale;
