//external import
const express = require('express');
const router = express.Router();
//internal import
const userControl = require('../controllers/users.js')

router.post('/login', userControl.login)
router.delete('/logout',userControl.logout)
router.get('/new',userControl.newusr)
router.post('/create',userControl.create)

module.exports = router;
