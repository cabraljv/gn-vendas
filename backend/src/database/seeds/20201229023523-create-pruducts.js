module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'CAMISETA 182LIFE',
          category_id: 1,
          description: 'CAMISETA 182LIFE A MAIS NOVA MODA',
          price: 5000,
          img_path:
            'http://localhost:3333/files/3bebe4f9e9f863f22e83e1c24cdcd218',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'CAMISETA HANG LOOSE',
          category_id: 1,
          description: 'CAMISETA HANG LOOSE A MAIS NOVA MODA',
          price: 6000,
          img_path:
            'http://localhost:3333/files/36793ee2d61e0271727c2a56761e08a5',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'BERMUDA MOLETOM',
          category_id: 2,
          description: 'BERMUDA MOLETOM A MAIS NOVA MODA',
          price: 7000,
          img_path:
            'http://localhost:3333/files/a50f17b30301099eea152bbd84662867',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    queryInterface.bulkDelete('products', null, {});
  },
};
