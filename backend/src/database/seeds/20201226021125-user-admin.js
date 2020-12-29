module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin user',
          is_admin: true,
          password_hash:
            '$2a$08$tN0DFPloHsGGxQoZtXNhu.wM2w0u41OAzXTpuvCdpM3K/2tHMGmfa',
          cpf: '49064177449',
          phone: '3112344321',
          email: 'admin@gnvendas.com',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('users', null, {});
  },
};
