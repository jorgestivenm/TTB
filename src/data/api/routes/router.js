const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const passportBasic = require('../../../auth_config/passport');

router.all(
  "*", passportBasic.authenticate('basic', { session: false }));

router.post('/user',userController.createUser);
router.get('/users', userController.getUsers);
router.put('/user', userController.updateUser);
router.delete('/user', userController.deleteUser);
router.get('/user', userController.getUser);


module.exports = router;