import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import Category from '../app/models/Category';
import Product from '../app/models/Product';
import ProductSold from '../app/models/ProductSold';
import Sale from '../app/models/Sale';

const models = [User, Category, ProductSold, Sale, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
