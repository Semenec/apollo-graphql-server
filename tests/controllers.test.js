const {
  createUser,
  removeUserByEmail,
  findOneUserByEmail,
  login
} = require('../controllers/user');

it('users controllers tests', async () => {

  const userDataValid = {
    firstName: 'testFirstName',
    lastName: 'testLastName',
    password: '123344',
    email: 'test@test.com'
  };

  const userDataInvalid = {
    firstName: 'testFirstName',
    lastName: 'testLastName',
    password: '123344',
    email: 'invalid email'
  };

  const result = await createUser(null, { input: userDataValid });
  const resultSeccondUser = await createUser(null, { input: userDataValid });
  const resultInvalidEmail = await createUser(null, { input: userDataInvalid });
  const findOneUserByEmailValidResult = await findOneUserByEmail(null, userDataValid.email);
  const loginValidResult = await login(null, { email: userDataValid.email, password: userDataValid.password });
  const loginInvalidEmailResult = await login(null, { email: userDataInvalid.email, password: result.password });

  const {
    firstName,
    lastName,
    email,
    password,
    id
  } = result;

  if (findOneUserByEmailValidResult.email !== userDataValid.email) throw new Error(`Expected ${userDataValid.email} but got ${findOneUserByEmailValidResult.email}`)
  if (resultInvalidEmail.id) throw new Error('Validation of email is not work');
  if (resultSeccondUser.id) throw new Error(`Validation of dublication email is not worket`);
  if (firstName !== userDataValid.firstName) throw new Error(`Expected ${userDataValid.firstName}, but got ${result.firstName}`);
  if (lastName !== userDataValid.lastName) throw new Error(`Expected ${userDataValid.lastName}, but got ${result.lastName}`);
  if (email !== userDataValid.email) throw new Error(`Expected ${userDataValid.email}, but got ${result.email}`);
  if (password === userDataValid.password) throw new Error(`Password not has hash`);
  if (loginValidResult.message !== `Hello ${userDataValid.firstName} ${userDataValid.lastName}`) throw new Error(`Login method is not work`);
  if (loginInvalidEmailResult.message === `Hello ${userDataInvalid.firstName} ${userDataInvalid.lastName}`) throw new Error(`Login has not registered email`);

  const removeResult = await removeUserByEmail(null, id);

  if (removeResult !== 'Deleted successfully') throw new Error(`Deleted users is not work`);

});



