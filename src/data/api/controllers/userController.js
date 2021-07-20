const userService = require('../../../domain/entities/services/userApiServices');

exports.createUser = async (req, res, next) => {
  userService.create(req, res, next);
};

exports.getUsers = async (req, res, next) => {
  userService.findAll(req, res, next);
};

exports.updateUser = async (req, res, next) => {
  userService.update(req, res, next);
};

exports.deleteUser = async (req, res, next) => {
  userService.delete(req, res, next);
};

exports.getUser = async (req, res, next) => {
  userService.findById(req, res, next);
};