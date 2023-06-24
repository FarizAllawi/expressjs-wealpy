const express = require('express');
const router = express.Router();

const user = require('./user');
const role = require('./role');
const referral = require('./referral');

// Route User
router.get('/', user.get);
router.post('/',  user.create);
router.put('/', user.update);
router.delete('/', user.destroy);


// Route User

module.exports = router;
