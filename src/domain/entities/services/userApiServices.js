const { InsertUserI, DeleteUserI, UpdateUserI, FindAllUserI, FindUserI } = require('../dto/userInterface');
const userRepository = require('../../repository/userRepository');
const logger = require('../../../utils/logger');
const { registerUserSchema, updateUserSchema, UserIdSchema, authUserSchema } = require('../schemas/userSchemas');
const { getAjvInstace } = require('../../../utils/ajvSingleton');
const ajv = getAjvInstace();
const {
  DatabaseDaoError,
  NotFoundError,
  ProcessingRequestError,
  AuthenticationError,
  ConflictError,
} = require('../../../data/api/http_error_handler/httpErrors');

/**
 * Exporting the create service function used to create new users into the database
 * @async
 * @function create
 * @returns http response
 */
exports.create = async (req, res, next) => {
  /** Compiling the auth schema to validate the format of the user given by the auth midleware */
  const ajv_authValidate = ajv.compile(authUserSchema);
  if(!ajv_authValidate(req.user)) return res.status(401).send(
    new AuthenticationError('Invalid User or password, please check!')
  );
  /** Compiling the user registry schema to validate the format of the user in the request body */
  const ajv_userValidate = ajv.compile(registerUserSchema);
  if (!ajv_userValidate(req.body)) {
    logger.error('Data validation error, check the data');
    return res
      .status(400)
      .send(
        new ProcessingRequestError(
          "Error cheking the input information, please check the information and required fields",
          ajv_userValidate.errors
        )
      );
  }

  let newuser = req.body;
  let answ1 = await userRepository.getAllUsrs(FindAllUserI());
  if (!answ1[0]) {
    return next(new DatabaseDaoError("Error on database getting all users"));
  }

  let cUserId = 0;
  let users = answ1[1];
  /**Checking if the user already exist in the database */
  for (const key in users) {
    if(users[key].email == newuser.email) return next(
      new ConflictError('There is another user with the same email'));
    if (users[key].userid > cUserId) {
      cUserId = users[key].userid;
    }
  }

  newuser['userid'] = cUserId + 1
  const params = await InsertUserI(newuser);
  /**Creating the new user in the database */
  let answ2 = await userRepository.createUsr(params);
  if (!answ2[0]) {
    return next(new DatabaseDaoError("Error on database creating the user"));
  }

  return res.status(201).send({
    message: 'User has been created successfully'
  });
}

/**
 * Exporting the update service function used to update an users into the database
 * @async
 * @function update
 * @returns http response
 */
exports.update = async (req, res, next) => {
  /** Compiling the auth schema to validate the format of the user given by the auth midleware */
  const ajv_authValidate = ajv.compile(authUserSchema);
  if(!ajv_authValidate(req.user)) return res.status(401).send(
    new AuthenticationError('Invalid User or password, please check!')
  );
  /** Compiling the update user schema to validate the format of the user in the request body */
  const ajv_userValidate = ajv.compile(updateUserSchema);
  if (!ajv_userValidate(req.body)) {
    logger.error('Data validation error, check the data');
    return res
      .status(400)
      .send(
        new ProcessingRequestError(
          "Error cheking the input information, please check the information and required fields",
          ajv_userValidate.errors
        )
      );
  }

  let user = req.body;
  const params = UpdateUserI(user);
  /** Updating the user in the database */
  let answ = await userRepository.updateUsr(params);
  if (!answ[0]) {
    return next(new DatabaseDaoError("Error on database updating the user"));
  }

  return res.status(200).send({
    message: 'User has been updated successfully'
  });
}

/**
 * Exporting the get all users service function used to get the users into the database
 * @async
 * @function findAll
 * @returns http response
 */
exports.findAll = async (req, res, next) => {
  /** Compiling the auth schema to validate the format of the user given by the auth midleware */
  const ajv_authValidate = ajv.compile(authUserSchema);
  if(!ajv_authValidate(req.user)) return res.status(401).send(
    new AuthenticationError('Invalid User or password, please check!')
  );
  const params = FindAllUserI();
  /** Getting the users in database */
  let answ = await userRepository.getAllUsrs(params);
  if (answ[0] === false) {
    return next(new DatabaseDaoError("Error on database getting all users"));
  }
  /** Checking if exist users in database */
  if (answ[1] === undefined) {
    return res.status(404).send(
      new NotFoundError("Error - there is no User")
    );
  }
  return res.status(200).send({
    message: 'Users found',
    data: answ[1]
  });
}

/**
 * Exporting the delete service function used to delete an user into the database
 * @async
 * @function delete
 * @returns http response
 */
exports.delete = async (req, res, next) => {
  /** Compiling the auth schema to validate the format of the user given by the auth midleware */
  const ajv_authValidate = ajv.compile(authUserSchema);
  if(!ajv_authValidate(req.user)) return res.status(401).send(
    new AuthenticationError('Invalid User or password, please check!')
  );
  /** Compiling the userid schema to validate the queryparam format in the request */
  const ajv_userValidate = ajv.compile(UserIdSchema);
  if (!ajv_userValidate(req.query)) {
    logger.error('Data validation error, check the data');
    return res
      .status(400)
      .send(
        new ProcessingRequestError(
          "Error cheking the input information, please check the information and required fields",
          ajv_userValidate.errors
        )
      );
  }
  let userid = req.query.userid;
  let params = FindUserI(userid);
  /** Getting user by id before to delete the user*/
  let answ = await userRepository.getUserById(params);
  if (answ[0] === false) {
    return next(new DatabaseDaoError("Error on database getting the user"));
  }
  /** checking if the user exist in the database*/
  if (answ[1] === undefined) {
    return res.status(404).send(
      new NotFoundError("Error - this user does not exist, please check the data")
    );
  }
  let user = answ[1];
  params = DeleteUserI(user);
  /** Deleting the user  from the database*/
  answ = await userRepository.deleteUsr(params);
  if (!answ[0]) {
    return next(new DatabaseDaoError("Error on database deleting the user"));
  }

  return res.status(200).send({
    message: 'User has been deleted successfully'
  });
}

/**
 * Exporting the get by id service function used to get an user from the database
 * @async
 * @function findById
 * @returns http response
 */
exports.findById = async (req, res, next) => {
  /** Compiling the auth schema to validate the format of the user given by the auth midleware */
  const ajv_authValidate = ajv.compile(authUserSchema);
  if(!ajv_authValidate(req.user)) return res.status(401).send(
    new AuthenticationError('Invalid User or password, please check!')
  );
  /** Compiling the userid schema to validate the queryparam format in the request */
  const ajv_userValidate = ajv.compile(UserIdSchema);
  if (!ajv_userValidate(req.query)) {
    logger.error('Data validation error, check the data');
    return res
      .status(400)
      .send(
        new ProcessingRequestError(
          "Error cheking the input information, please check the information and required fields",
          ajv_userValidate.errors
        )
      );
  }

  let userid = req.query.userid 
  const params = FindUserI(userid);
  /**Getting the user by id from the database */
  let answ = await userRepository.getUserById(params);
  if (answ[0] === false) {
    return next(new DatabaseDaoError("Error on database getting the user"));
  }
  /** checking if the user exist in the database*/
  if (answ[1] === undefined) {
    return res.status(404).send(
      new NotFoundError("Error - this user does not exist, please check the data")
    );
  }
  return res.status(200).send({
    message: 'User found',
    data: answ[1]
  });
}