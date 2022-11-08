const { Router } = require('express');

const { 
    createUser, 
    loginUser,
    deleteUser
} = require('../controllers/users.controllers');

const router = Router();

router.route('/register')
    .post(createUser)

router.route('/login')
    .post(loginUser)

router.route('/user/:id')
    .delete(deleteUser)

module.exports = router;