const express = require('express')
const userController = require('../controllers/user.controller');
const verifyToken  = require('../utils/verifyUser');

const router = express.Router()



module.exports = router