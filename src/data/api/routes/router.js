const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController')


router.post('/user',userController.createUser);
router.get('/user', userController.getUsers);
router.put('/user', userController.updateUser);
router.delete('/user', userController.deleteUser);


module.exports = router;