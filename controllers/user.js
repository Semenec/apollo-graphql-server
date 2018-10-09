const User = require('../models').User;
const bcrypt = require("bcrypt");

const createUser = async (rootObj, input) => {
  try {
    return await User.create(input.input)
      .then(user => user)
      .catch(error => error)
  } catch (error) {
    return error
  }
}

const findOneUserByEmail = async (rootObj, email) => {
  try {
    return await User.find({ where: { email: email }, raw: true })
      .then(user => user)
      .catch(error => error)
  } catch (error) {
    return error
  }
}

const removeUserByEmail = async (rootObj, id) => {
  try {
    result = await User.destroy({ where: { id: id }, raw: true })
      .then(result => result)
      .catch(error => error)

      return result ? 'Deleted successfully' : null
  } catch (error) {
    return error
  }
}

const login = async (rootObj, data) => {
  const { email, password } = data;

  const user = await findOneUserByEmail(null, email);

  if (user) {
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (isValidPassword) {
      return { message: `Hello ${user.firstName} ${user.lastName}` }
    }

    return new Error('Password is not valid');
  }
  return new Error('User is not found');


}

module.exports = {
  createUser,
  findOneUserByEmail,
  login,
  removeUserByEmail
}