const { createUser, findOneUserByEmail, login } = require('../controllers/user')

const userResolver = {
  Query: {
    getUser: findOneUserByEmail
  },
  Mutation: {
    registration: createUser,
    login: login
  }
};

module.exports = userResolver;