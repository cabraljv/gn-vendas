module.exports = {
  up: async (queryInterface) => {
    queryInterface.quert(`INSERT INTO gn_vendas.categories (name,created_at,updated_at) VALUES
    ('Camisetas','2020-12-29 01:45:01','2020-12-29 01:45:01');`);
    queryInterface.quert(`INSERT INTO gn_vendas.categories (name,created_at,updated_at) VALUES
    ('Bermudas','2020-12-29 01:52:05','2020-12-29 01:52:05');`);

    queryInterface.quert(`INSERT INTO gn_vendas.products (name,category_id,description,price,img_path,created_at,updated_at) VALUES
    ('CAMISETA 182LIFE',1,'Camiseta 182Life.',5900,'http://localhost:3333/files/3bebe4f9e9f863f22e83e1c24cdcd218','2020-12-29 01:49:37','2020-12-29 01:49:37');`);
    queryInterface.quert(`INSERT INTO gn_vendas.products (name,category_id,description,price,img_path,created_at,updated_at) VALUES
    ('CAMISETA HANG LOOSE',1,'CAMISETA HANG LOOSE',5000,'http://localhost:3333/files/36793ee2d61e0271727c2a56761e08a5','2020-12-29 01:51:41','2020-12-29 01:51:41');`);
    queryInterface.quert(`INSERT INTO gn_vendas.products (name,category_id,description,price,img_path,created_at,updated_at) VALUES
    ('BERMUDA MOLETOM',2,'BERMUDA MASCULINA  MOLETOM',6000,'http://localhost:3333/files/a50f17b30301099eea152bbd84662867','2020-12-29 01:53:11','2020-12-29 01:53:11');`);
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('categories', null, {});
    queryInterface.bulkDelete('products', null, {});
  },
};
