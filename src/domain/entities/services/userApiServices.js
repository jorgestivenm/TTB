const { InsertUserI, DeleteUserI, UpdateUserI, FindAllUserI, FindUserI } = require('../dto/userInterface');
const userRepository = require('../../repository/userRepository');
const logger = require('../../../utils/logger');
const { registerUserSchema, updateUserSchema, UserIdSchema } = require('../schemas/userSchemas');
const { getAjvInstace } = require('../../../utils/ajvSingleton');
const ajv = getAjvInstace();

const {
  DatabaseDaoError,
  NotFoundError,
  ProcessingRequestError,
} = require('../../../data/api/http_error_handler/httpErrors');

exports.create = async (req, res, next) => {
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
  for (const key in users) {
    if (users[key].userid > cUserId) {
      cUserId = users[key].userid;
    }
  }

  newuser['userid'] = cUserId + 1
  const params = InsertUserI(newuser);
  let answ2 = await userRepository.createUsr(params);
  if (!answ2[0]) {
    return next(new DatabaseDaoError("Error on database creating the user"));
  }

  return res.status(201).send({
    message: 'User has been created successfully'
  });
}

exports.update = async (req, res, next) => {
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
  let answ = await userRepository.updateUsr(params);
  if (!answ[0]) {
    return next(new DatabaseDaoError("Error on database updating the user"));
  }

  return res.status(200).send({
    message: 'User has been updated successfully'
  });
}

exports.findAll = async (req, res, next) => {
  const params = FindAllUserI();
  let answ = await userRepository.getAllUsrs(params);
  if (answ[0] === false) {
    return next(new DatabaseDaoError("Error on database getting all users"));
  }

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

exports.delete = async (req, res, next) => {
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
  let userid = parseInt(req.query.userid);
  let params = FindUserI(userid);
  let answ = await userRepository.getUserById(params);
  if (answ[0] === false) {
    return next(new DatabaseDaoError("Error on database getting the user"));
  }

  if (answ[1] === undefined) {
    return res.status(404).send(
      new NotFoundError("Error - this user does not exist, please check the data")
    );
  }
  
  params = DeleteUserI(userid);
  answ = await userRepository.deleteUsr(params);
  if (!answ[0]) {
    return next(new DatabaseDaoError("Error on database deleting the user"));
  }

  return res.status(200).send({
    message: 'User has been deleted successfully'
  });
}

exports.findById = async (req, res, next) => {

  const ajv_userValidate = ajv.compile(UserIdSchema);
  logger.info(req.query);
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

  let userid = parseInt(req.query.userid);
  const params = FindUserI(userid);
  let answ = await userRepository.getUserById(params);
  if (answ[0] === false) {
    return next(new DatabaseDaoError("Error on database getting the user"));
  }

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