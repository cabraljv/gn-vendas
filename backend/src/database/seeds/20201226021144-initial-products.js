module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Camisetas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bermudas',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    queryInterface.bulkDelete('categories', null, {});
  },
};
