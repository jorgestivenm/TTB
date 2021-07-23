const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const passportBasic = require('../../../auth_config/passport');

/** Adding the midleware to performe the basic authentication before to pass to the API methods */
router.all(
  "*", passportBasic.authenticate('basic', { session: false }));

/** Exposing the CREATE user route in the API */
router.post('/user',userController.createUser);
/** Exposing the GET users route in the API */
router.get('/users', userController.getUsers);
/** Exposing the GET user by id route in the API */
router.put('/user', userController.updateUser);
/** Exposing the DELETE user by id route in the API */
router.delete('/user', userController.deleteUser);
/** Exposing the UPDATE user route in the API */
router.get('/user', userController.getUser);

/**
 * Exporting the user routes to be added and exposed in the app configuration
 * @module router
 */
module.exports = router;