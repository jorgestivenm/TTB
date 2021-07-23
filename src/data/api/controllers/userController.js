const userService = require('../../../domain/entities/services/userApiServices');
/**Export the Controller to create user
 * @method createUser
 */
exports.createUser = async (req, res, next) => {
  userService.create(req, res, next);
};
/**Export the Controller to get users
 * @method createUser
 */
exports.getUsers = async (req, res, next) => {
  userService.findAll(req, res, next);
};
/**Export the Controller to update user
 * @method createUser
 */
exports.updateUser = async (req, res, next) => {
  userService.update(req, res, next);
};
/**Export the Controller to delete user
 * @method createUser
 */
exports.deleteUser = async (req, res, next) => {
  userService.delete(req, res, next);
};
/**Export the Controller to get user by id
 * @method createUser
 */
exports.getUser = async (req, res, next) => {
  userService.findById(req, res, next);
};